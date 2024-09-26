import { useState } from "react"

export default function Test({items}){
    const [newItems, setItems] = useState(items)
    const handleClick = (index)=> {
        const searchItem = newItems[index]
        const find = newItems.filter((item)=> item !== searchItem )
        const updatedItems = [searchItem, ...find]
        setItems(updatedItems)
    }
    return <ul>
        {newItems.map((item, index)=>{
            return (<li key={Math.random()*1000} onClick={()=> handleClick(index)}>
               {item.title}
            </li>)
        })}
    </ul>
}