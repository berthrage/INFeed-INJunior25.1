import styles from './styles.module.css';
import { formatDistanceToNow, Locale, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useRef, useState } from 'react';
import PrimaryButton from '../PrimaryButton';
import PrimaryTextArea from '../PrimaryTextArea';
import CommentCard from '../CommentCard';
import { PostProperties } from '../../types/PostProperties';
import { CommentProperties } from '../../types/CommentProperties';
import felyppePhoto from "../../assets/images/felyppe.jpg"


// Remove "cerca de" no display de tempo
const customPtBR: Locale = {
    ...ptBR,
    formatDistance: (token: string, count: number, options?: { addSuffix?: boolean }) => {
      const result = ptBR.formatDistance(token as any, count, options);
      return result.replace('cerca de ', ''); 
    },
};

export default function PostCard(props: PostProperties 
    & { onDeleteComment: (postId: string, commentId: string) => void }
    & { onGiveCommentLike: (postId: string, commentId: string) => void }
    & { onUndoCommentLike: (postId: string, commentId: string) => void }) {

    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleDeleteComment = (commentId: string) => {
        props.onDeleteComment(props.id, commentId); 
    };

    const handleGiveCommentLike = (commentId: string) => {
        props.onGiveCommentLike(props.id, commentId);
    }

    function handleUndoCommentLike(commentId: string): void {
        props.onUndoCommentLike(props.id, commentId);
    }


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
                                liked={comment.liked}
                                onDelete={handleDeleteComment}
                                onGiveLike={handleGiveCommentLike}
                                onUndoLike={handleUndoCommentLike}
                                >
                            </CommentCard>
                        )}
                    </div>
                )}
                
            </div>
        </>
    )
}