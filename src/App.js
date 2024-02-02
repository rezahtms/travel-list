import { useState } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState([]);

  function handleAddItem(newItem) {
    setItem((current) => [...current, newItem]);
  }

  function handleDeleteItem(id) {
    const confirmDelete = window.confirm(
      `are you sure delete item with id ${id}?`
    );
    if (confirmDelete)
      setItem((current) => current.filter((item) => item.id !== id));
  }

  function handleTogglePacked(id) {
    setItem((current) =>
      current.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmClearList = window.confirm("Are You Sure Clear item's list?");
    if (confirmClearList) setItem([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        item={item}
        onHandleDeleteItem={handleDeleteItem}
        handleTogglePacked={handleTogglePacked}
        onHandleClearList={handleClearList}
      />
      <Stats items={item} />
    </div>
  );
}

const Logo = () => {
  return <h1>🌴 FAR AWAY 👜</h1>;
};

const Form = ({ handleAddItem }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, id: Date.now(), packed: false };
    handleAddItem(newItem);
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What Do You Need For Your 😍 Trip?</h3>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <button type="submit">ADD</button>
    </form>
  );
};

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

const Item = ({ item, onHandleDeleteItem, handleTogglePacked }) => {
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => handleTogglePacked(item.id)}
        value={item.packed}
      />
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onHandleDeleteItem(item.id)}>❌</button>
    </li>
  );
};

const Stats = ({ items }) => {
  const itemNum = items.length;
  const packedItemNum = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItemNum / itemNum) * 100);
  if (percentage === 100)
    return (
      <p className="stats">
        <em>You got everything, Ready to go 🛫</em>
      </p>
    );
  return (
    <footer className="stats">
      <em>
        {itemNum === 0
          ? "starting adding some items to your packing list 🚀"
          : ` You Have Got ${itemNum} Pack On YourList,And You Already ${
              packedItemNum === 0
                ? `packed anything`
                : ` packed ${packedItemNum} (${percentage}%)`
            }`}
      </em>
    </footer>
  );
};

export default App;
