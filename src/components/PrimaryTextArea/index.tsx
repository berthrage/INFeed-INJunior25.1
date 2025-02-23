import styles from "../PrimaryInput/styles.module.css";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    children?: React.ReactNode;
    className?: string;
}

export default function PrimaryTextArea(props: TextAreaProps) {
    return (
        <>
            <textarea {...props} className={`${styles.input} ${props.className || ""}`}>
                {props.children}
            </textarea>
        </>
    )
}