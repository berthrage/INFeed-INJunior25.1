import styles from "./styles.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
    className?: string;
}

export default function PrimaryInput(props: InputProps) {
    return (
        <>
            <input {...props} className={`${styles.input} ${props.className || ""}`}>
                {props.children}
            </input>
        </>
    )
}