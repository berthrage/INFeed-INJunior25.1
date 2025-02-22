import { useState } from "react";

export default function useCounter() {
    const [counter, setCounter] = useState(0);

    function incrementCounter() {
        setCounter((currentState) => currentState + 1);
    }

    return { counter, incrementCounter };
}