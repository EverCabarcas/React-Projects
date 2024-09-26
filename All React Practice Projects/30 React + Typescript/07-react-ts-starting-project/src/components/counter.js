import { useEffect, useState } from "react"
import { useCounter } from "../customHooks/useCounter"

export function Counter(){
    const {counter, setCounter} = useCounter(0)
    const [query, setQuery] = useState(false)

    useEffect(()=> {
        setCounter((prev)=> prev + 1 )
        console.log('dentro del efecto')
    }, [query])
    
    function handleClick(){
        setCounter((prev)=> prev + 1 )
    }

    function handleQuery(){
        setQuery((prev) => !prev)
    }
    return <>
    <h1>Counter</h1>
    <p>{counter}</p>
    <button onClick={handleClick}>Increment</button>
    <button onClick={handleQuery}>Send Query</button>
    </>
}