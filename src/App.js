import "./App.css";

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

const Logo = () => {
  return <h1>🌴 FAR AWAY 👜</h1>;
};

const Form = () => {
  return (
    <form className="add-form">
      <h3>What Do You Need For Your 😍 Trip?</h3>
    </form>
  );
};

const PackingList = () => {
  return <div className="list">List</div>;
};

const Stats = () => {
  return (
    <footer className="stats">
      <em>You Have Got X Pack On YourList,And You Already Packed X (X%)</em>
    </footer>
  );
};

export default App;
