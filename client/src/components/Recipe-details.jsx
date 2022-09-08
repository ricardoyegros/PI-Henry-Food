import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipesDetails } from "../redux/actions";
import { Link } from "react-router-dom";

export default function RecipeDetails(recipe) {
  let dispatch = useDispatch();

  let idRecipe = recipe.match.params.id;

  let recipeToDetail = useSelector((state) => state.allRecipes);
  useEffect(() => {
    dispatch(recipesDetails(idRecipe));
  }, [dispatch, idRecipe]);
  console.log(recipeToDetail);
  return (
    <div>
      <h1>{recipeToDetail[0].name}</h1>
      <img src={recipeToDetail[0].image} />
      <h4>
        {
          <p>
            <b>Diets:</b>{" "}
            {recipeToDetail[0].diets?.map((diet, i) => (
              <p key={i}>{diet || diet.map((d) => d.name)}</p>
            ))}
          </p>
        }
      </h4>
      <h4>DishTypes: {recipeToDetail[0].dishTypes}</h4>
      <h4>HealthScore: {recipeToDetail[0].healthScore}</h4>
      <p>
        <b>Steps:</b> {recipeToDetail[0].steps}
      </p>
      <Link to="/home-page">
        <button>Go Back to Home=Page</button>
      </Link>
    </div>
  );
}
