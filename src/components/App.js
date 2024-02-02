import { useState } from "react";
import "../App.css";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

export default App;
