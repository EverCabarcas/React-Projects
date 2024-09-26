import { useState } from "react";

export function useCounter(initialValue){
 const [counter, setCounter] = useState(initialValue)

 return {
    counter,
    setCounter,
 }
}