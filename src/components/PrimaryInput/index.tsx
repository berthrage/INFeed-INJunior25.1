import styles from "./styles.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    inputText: string;
    setText: (text: string) => void;
}

export default function PrimaryInput(props: InputProps) {
    return (
        <>
            <input {...props} 
                className={`${styles.input} ${props.className || ""}`}
                value={props.inputText}
                onChange={(e) => props.setText(e.target.value)}
                >
            </input>
        </>
    )
}