import styles from "./styles.module.css";
import coverImg from "../../assets/images/cover-berth.gif"
import myPhoto from "../../assets/images/berth.jpg"
import { useEffect, useRef, useState } from "react";

export default function ProfileCard() {
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
                <div className={styles.bgImg}>
                    <img src={coverImg}></img>
                </div>
                <div className={styles.totalInfo}>
                    <div className={styles.myPhoto}>
                        <img src={myPhoto}></img>
                    </div>
                    <div className={styles.descInfo}>
                        <h1>Leandro Berth</h1>
                        <p>Desenvolvedor Front-End</p>
                    </div>
                </div>
            </div>
        </>
    )
    
}