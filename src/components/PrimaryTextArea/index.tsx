import styles from "../PrimaryInput/styles.module.css";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    inputText: string;
    setText: (text: string) => void;
}

export default function PrimaryTextArea({ className, inputText, setText, ...rest } : TextAreaProps) {
    return (
        <>
            <textarea {...rest} 
                className={`${styles.input} ${className || ""}`}
                value={inputText}
                onChange={(e) => setText(e.target.value)}
                >
            </textarea>
        </>
    )
}