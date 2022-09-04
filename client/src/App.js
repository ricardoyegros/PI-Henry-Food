import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/Landing-page";

function App() {
  return (
      <div className="App">
        <h1>Henry Food</h1>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home-page" component={HomePage}/>
        </Switch>
      </div>
  );
}

export default App;
