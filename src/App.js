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
  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList item={item} onHandleDeleteItem={handleDeleteItem} />
      <Stats />
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

const PackingList = ({ item, onHandleDeleteItem }) => {
  return (
    <div className="list">
      <ul>
        {item.map((item) => (
          <Item
            item={item}
            key={item.id}
            onHandleDeleteItem={onHandleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item, onHandleDeleteItem }) => {
  return (
    <li>
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onHandleDeleteItem(item.id)}>❌</button>
    </li>
  );
};

const Stats = () => {
  return (
    <footer className="stats">
      <em>You Have Got X Pack On YourList,And You Already Packed X (X%)</em>
    </footer>
  );
};

export default App;
