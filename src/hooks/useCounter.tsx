import { useState } from "react";

export default function useCounter(initialCount: number) {
    const [counter, setCounter] = useState(initialCount);

    function incrementCounter() {
        setCounter((currentState) => currentState + 1);
    }

    return { counter, incrementCounter };
}