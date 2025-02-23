import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { formatDistanceToNow, Locale, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import trashIcon from "../../assets/icons/trash-icon.png";
import likeIcon from "../../assets/icons/like-icon.png";
import likeLikedIcon from "../../assets/icons/like-liked-icon.png"
import { CommentProperties } from "../../types/CommentProperties";

// Replaces "cerca de" with "Cerca de" on time display
const customPtBR: Locale = {
    ...ptBR,
    formatDistance: (token: string, count: number, options?: { addSuffix?: boolean }) => {
      const result = ptBR.formatDistance(token as any, count, options);
      return result.replace('cerca de ', 'Cerca de '); 
    },
};


export default function CommentCard(props: CommentProperties 
        & { onDelete: (commentId: string) => void }
        & { onGiveLike: (commentId: string) => void}
        & { onUndoLike: (commentId: string) => void}
        & {postFadedIn: boolean}) {

    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);   
    const [isLiked, setIsLiked] = useState(props.liked);
    const [timeAgo, setTimeAgo] = useState(() => formatDistanceToNow(parseISO(props.timestamp), { locale: customPtBR }));

    function HandleLikes(): void {
        if (!isLiked) {
            props.onGiveLike(props.id);
            setIsLiked(true);
            return;
        } 
        
        props.onUndoLike(props.id);
        setIsLiked(false);
    }

    // Observer for Fade-in Effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && props.postFadedIn) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            }, { threshold: 0.2 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();

    }, []);

    // Update the timeAgo state every 60 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeAgo(formatDistanceToNow(parseISO(props.timestamp), { locale: customPtBR }));
        }, 60000); 

        return () => clearInterval(interval);
    }, [props.timestamp]);

    return (
        <>
            <div ref={cardRef} className={`${styles.card}`}>
                <div className={styles.topBox}>
                    <img className={styles.authorPhoto} src={props.authorPhoto}></img>
                    <div className={styles.commentLikeBox}>

                        <div className={styles.commentBox}>
                            <div className={styles.topSection}>
                                
                                <div className={styles.nameTime}>
                                    <h1>{props.author}</h1>
                                    <p>{timeAgo}</p>
                                </div>
                                
                                <div className={styles.deleteIcon} onClick={() => props.onDelete(props.id)}>
                                    <img src={trashIcon}></img>
                                </div>

                            </div>

                            <div className={styles.contentSection}>
                                <p>{props.content}</p>
                            </div>

                        </div>

                        <div className={styles.likeSection}>
                            <div className={styles.likeClick} onClick={HandleLikes}>
                                <img src={isLiked? likeLikedIcon : likeIcon}></img>
                                <p className={isLiked? styles.likeTextOn : styles.likeTextOff}>Like • {props.likes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}