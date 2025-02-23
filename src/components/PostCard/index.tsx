import styles from './styles.module.css';
import { formatDistanceToNow, Locale, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useRef, useState } from 'react';
import PrimaryButton from '../PrimaryButton';
import PrimaryTextArea from '../PrimaryTextArea';
import CommentCard from '../CommentCard';
import { PostProperties } from '../../types/PostProperties';
import { PostCardContext } from "../../stores/PostCardContext"


// Remove "cerca de" no display de tempo
const customPtBR: Locale = {
    ...ptBR,
    formatDistance: (token: string, count: number, options?: { addSuffix?: boolean }) => {
      const result = ptBR.formatDistance(token as any, count, options);
      return result.replace('cerca de ', ''); 
    },
};

export default function PostCard(props: PostProperties & { onDeleteComment: (postId: string, commentId: string) => void }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [comments, setComments] = useState(props.comments);

    const handleDeleteComment = (commentId: string) => {
        setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
        props.onDeleteComment(props.id, commentId); // Notify Feed
    };

    // Observer for Fade-in Effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            }, { threshold: 0.3 } // Trigger when 30% of the card is visible
            );
    
            if (cardRef.current) {
                observer.observe(cardRef.current);
            }
    
            return () => observer.disconnect();
    
        }, []);


    return (
        <>
            <div ref={cardRef} className={`${styles.card} ${isVisible ? styles.fadeIn : ""}`}>
                <div className={styles.topSection}>
                    <div className={styles.authorInfo}>
                        <img className={styles.authorPhoto} src={props.authorPhoto}></img>
                        <div className={styles.nameRole}>
                            <h1>{props.author}</h1>
                            <p>{props.authorRole}</p>
                        </div>
                    </div>
                    <div className={styles.timeInfo}>
                        <p>Publicado há {formatDistanceToNow(parseISO(props.timestamp), { locale: customPtBR })}</p>
                    </div>
                </div>

                <div className={styles.contentSection}>
                    <p>{props.content}</p>
                </div>

                <div className={styles.commentInputSection}>
                    <label>Deixe seu feedback</label>
                    <PrimaryTextArea id={styles.commentTextArea} placeholder='Escreva um comentário...'></PrimaryTextArea>
                    <PrimaryButton>Comentar</PrimaryButton>
                </div>

                {props.comments.length > 0 && (
                    <div className={styles.commentSection}>
                        {props.comments?.map((comment) => 
                            <CommentCard
                                key={comment.id}
                                id={comment.id}
                                author={comment.author}
                                authorPhoto={comment.authorPhoto}
                                content={comment.content}
                                timestamp={comment.timestamp}
                                likes={comment.likes}
                                onDelete={handleDeleteComment}>
                            </CommentCard>
                        )}
                    </div>
                )}
                
            </div>
        </>
    )
}