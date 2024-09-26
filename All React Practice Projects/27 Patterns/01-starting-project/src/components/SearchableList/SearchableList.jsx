import { useRef, useState } from "react";

export default function SearchableList({ items, itemkey, children }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 500);
  }
  return (
    <div className="searchable-list">
      <input type="search" placeholder="search" onChange={handleChange}></input>
      <ul>
        {searchResults.map((item, index) => (
          <li key={itemkey(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
