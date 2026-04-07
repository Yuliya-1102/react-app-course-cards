import { useState } from "react";
import Button from "./components/Button/Button";

const Counter = () => {
    const [count, setCount] = useState(0);

    const setCounterHandler = () => {
        setCount(count + 1);
    };

    return <Button onClick={setCounterHandler}>Count is {count}</Button>;
};

export default Counter;
