import styles from './styles.module.css';
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useRef, useState } from 'react';

interface PostProperties {
    id: string;
    author: string;
    authorPhoto: string;
    content: string;
    timestamp: string; // ISO string (e.g., "2024-02-22T12:00:00Z")
}

export default function PostCard() {
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
                        <img className={styles.authorPhoto}></img>
                        <div className={styles.nameRole}></div>
                    </div>
                    <div className={styles.timeInfo}>
                        {/* <p>Publicado {formatDistanceToNow(parseISO(props.timestamp), { locale: ptBR })}</p> */}
                    </div>
                </div>
            </div>
        </>
    )
}