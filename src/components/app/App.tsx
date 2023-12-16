import Topnav from "./Topnav";

function App(props: any) {
  return (
    <div>
      <Topnav></Topnav>
      {props.children}
    </div>
  );
}

export default App;
