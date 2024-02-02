import { useState } from "react";
import Item from "./Item";

const PackingList = ({
  item,
  onHandleDeleteItem,
  handleTogglePacked,
  onHandleClearList,
}) => {
  const [sortedBy, setSortedBy] = useState("input");
  let sortedItems;
  switch (sortedBy) {
    case "input":
      sortedItems = item;
      break;
    case "description":
      sortedItems = item
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
      break;
    case "packed":
      sortedItems = item
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed));
      break;
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onHandleDeleteItem={onHandleDeleteItem}
            handleTogglePacked={handleTogglePacked}
            key={item.id}
          />
        ))}
      </ul>
      {item.length !== 0 && (
        <div className="actions">
          <select
            value={sortedBy}
            onChange={(event) => setSortedBy(event.target.value)}
          >
            <option value="input">Sorted by Input</option>
            <option value="description">Sorted by Description</option>
            <option value="packed">Sorted by Packed</option>
          </select>
          <button onClick={onHandleClearList}>Clear List</button>
        </div>
      )}
    </div>
  );
};

export default PackingList;
