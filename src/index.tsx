/* @refresh reload */
import { Navigate, Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import App from "./components/app/App";
import Compare from "./components/app/Compare";
import Levels from "./components/app/Levels";
import Words from "./components/app/Words";
import "./index.css";

render(
  () => (
    <Router>
      <Route
        path="/chinese-chart"
        component={() => <Navigate href={"/chinese-chart/words"} />}
      />
      <Route path="/chinese-chart" component={App}>
        <Route path="/words" component={Words} />
        <Route path="/levels/:level" component={Levels} />
        <Route path="/compare" component={Compare} />
      </Route>
    </Router>
  ),
  document.getElementById("root")!,
);
