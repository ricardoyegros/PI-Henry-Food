import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipesDetails, unMount } from "../redux/actions";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "../components/styles/recipe-detail/details.css";
import Loader from "./Loader";

export default function RecipeDetails(recipe) {
  let dispatch = useDispatch();

  let idRecipe = recipe.match.params.id;

  let recipeToDetail = useSelector((state) => state.recipeDetail);
  useEffect(() => {
    dispatch(recipesDetails(idRecipe));
    return () => {
      dispatch(unMount());
    };
  }, [dispatch, idRecipe]);
  return (
    <div>
      {recipeToDetail[0] ? (
        <div className="details-div">
          <nav className="nav-bar-detail">
            <Link to="/home-page">
              <img className="logo-detail" src={logo} />
            </Link>
          </nav>
          <div className="details-recipe-card">
            <h1>{recipeToDetail[0].name}</h1>
            <img
              className="image-details"
              alt="No se pudo cargar la imagen"
              src={recipeToDetail[0].image}
            />
            <h4>
              <u>HealthScore:</u> {recipeToDetail[0].healthScore}
            </h4>
            <p>
              <b>
                <u>Steps:</u>
              </b>{" "}
              {recipeToDetail[0].steps}
            </p>
            <h4>
              <u>DishTypes:</u> {recipeToDetail[0].dishTypes}
            </h4>
            <h4>
              {
                <p>
                  <b>
                    <u>Diets:</u>
                  </b>{" "}
                  {recipeToDetail[0].diets?.map((diet, i) => (
                    <p key={i}>{diet || diet.map((d) => d.name)}</p>
                  ))}
                </p>
              }
            </h4>
          </div>
          <div className="button-container">
            <Link to="/home-page">
              <button className="button-to-home">Go Back to Home-Page</button>
            </Link>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
