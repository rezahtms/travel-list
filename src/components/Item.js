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
export default Item;
