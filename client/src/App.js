import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/Landing-page";
import HomePage from "./components/Home-page";
import RecipeDetails from "./components/Recipe-details";
import AddNewRecipe from "./components/Add-New-Recipe";
import styles from "./components/styles/global.css"

/**/
function App() {
  return (
      <div className="App">
        {/* <h1>Henry Food</h1> */}
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home-page" component={HomePage}/>
          <Route exact path="/home-page/:id" component={RecipeDetails}/>
          <Route exact path="/add-new-recipe" component={AddNewRecipe}/>
        </Switch>
      </div>
  );
}

export default App;
