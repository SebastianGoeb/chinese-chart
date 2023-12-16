import Topnav from "./Topnav";

function App(props) {
  return (
    <div>
      <Topnav></Topnav>
      {props.children}
    </div>
  );
}

export default App;
