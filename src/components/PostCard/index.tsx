import styles from './styles.module.css';
import { formatDistanceToNow, Locale, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useRef, useState } from 'react';
import PrimaryButton from '../PrimaryButton';
import PrimaryTextArea from '../PrimaryTextArea';

interface PostProperties {
    id: string;
    author: string;
    authorRole: string;
    authorPhoto: string;
    content: string;
    timestamp: string; // ISO string (e.g., "2024-02-22T12:00:00Z")
}

// Remove "cerca de" no display de tempo
const customPtBR: Locale = {
    ...ptBR,
    formatDistance: (token: string, count: number, options?: { addSuffix?: boolean }) => {
      const result = ptBR.formatDistance(token as any, count, options);
      return result.replace('cerca de ', ''); 
    },
};

export default function PostCard(props: PostProperties) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Observer for Fade-in Effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
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
                        <p>Publicado há {formatDistanceToNow(parseISO(props.timestamp), { locale: customPtBR, addSuffix: false })}</p>
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
            </div>
        </>
    )
}