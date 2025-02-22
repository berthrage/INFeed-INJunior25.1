import PostCard from "../PostCard"
import styles from "./styles.module.css"

export default function Feed() {
    return (
        <>
            <div className={styles.feed}>
                <PostCard></PostCard>
                <PostCard></PostCard>
            </div>
        </>
    )
}