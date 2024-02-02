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

export default Stats;
