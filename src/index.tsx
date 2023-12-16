/* @refresh reload */
import { Navigate, Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import App from "./components/app/App";
import Compare from "./components/app/Compare";
import Levels from "./components/app/Levels";
import "./index.css";

render(
  () => (
    <Router>
      <Route
        path="/chinese-chart"
        component={() => <Navigate href={"/chinese-chart/levels"} />}
      />
      <Route path="/chinese-chart" component={App}>
        <Route path="/levels" component={Levels} />
        <Route path="/compare" component={Compare} />
      </Route>
    </Router>
  ),
  document.getElementById("root")!,
);
