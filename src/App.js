import { useState } from "react";
import "./App.css";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  const [item, setItem] = useState([]);

  function handleAddItem(newItem) {
    setItem((current) => [...current, newItem]);
  }
  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList item={item} />
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

const PackingList = ({ item }) => {
  return (
    <div className="list">
      <ul>
        {item.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item }) => {
  return (
    <li>
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
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
