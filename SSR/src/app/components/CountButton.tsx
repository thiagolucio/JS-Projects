'use client' 
import { useState } from "react";

export interface CountButtonProps {
    count: number
    increment: () => void
}

function CountButton(props: CountButtonProps) {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={()=> setCount(state => state + 1)} className="button" >Count: {count}</button>
        </div>
    )
}

export default CountButton;