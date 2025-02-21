import styles from "./styles.module.css";
import infeedLogo from "../../assets/icons/infeed-logo.svg"

export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <img src={infeedLogo}></img>
            </header>
        </>
    )
}