import { ParentComponent } from "solid-js";
import Topnav from "./Topnav";

const App: ParentComponent = (props) => {
  return (
    <div>
      <Topnav></Topnav>
      {props.children}
    </div>
  );
};

export default App;
