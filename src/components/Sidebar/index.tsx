import styles from "./styles.module.css";
import ProfileCard from "../ProfileCard";

export default function Sidebar() {
    return(
        <>
            <div className={styles.sidebar}>
                <ProfileCard></ProfileCard>
            </div>
        </>
    )
}