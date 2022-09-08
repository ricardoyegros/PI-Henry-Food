import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipies, alphabeticSort, orderByScore, filterByDiets, getAllDiets } from "../redux/actions/index";
import RecipeCard from "./Recipe-Card";
import SearchBar from "./Search-bar";
import { Link } from "react-router-dom";

// - [ ] Input de búsqueda para encontrar recetas por nombre
// - [ ] Área donde se verá el listado de recetas. Deberá mostrar su:
//   - Imagen
//   - Nombre
//   - Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
// - [ ] Botones/Opciones para filtrar por por tipo de dieta
// - [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por health score (nivel de comida saludable).
// - [ ] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.

export default function HomePage() {
  let allRecipes = useSelector((state) => state.recipes);
  let allDiets = useSelector((state) => state.allDiets)
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipies());
    dispatch(getAllDiets() )
  }, [dispatch]);
  const [order, setOrder] = useState("");
  
  function handleSortAlphabetical(e) {
    e.preventDefault();
    dispatch(alphabeticSort(e.target.value));
    setOrder(e.target.value);
  }
  function handleScoreSort(e) {
    e.preventDefault();                
    dispatch(orderByScore(e.target.value));
    setOrder(e.target.value);
}

function handleTypesOfDiets(e) {
  e.preventDefault();
    dispatch(filterByDiets(e.target.value));
  }

console.log(allRecipes)
  return (
    <div>
      <SearchBar />
      <div className="select">
        <label className="filters">Order:</label>
        <select
          className="selectFilter"
          name="sortAlphabetical"
          onChange={(e) => handleSortAlphabetical(e)}
        >
          <option disabled selected >
            By Name
          </option>
          <option value="a-z">A to Z</option>
          <option value="z-a">Z to A</option>
        </select>
        <select
          className="healthscoreSelection"
          name="healthscore"
          onChange={(e) => handleScoreSort(e)}
        >
          <option disabled selected>
            By Healthscore
          </option>
          <option value="maxScore">From Min to Max</option>
          <option value="minScore">From Max to Min</option>
        </select>
        <label className="filterByDiets">Filter By Diets: </label>
        <select className="select-diets" name="diets" onChange={e => handleTypesOfDiets(e)}>
            <option disabled selected>Select a Type of Diet</option>
            {allDiets?.map((diet, i) => <option key={i} value={diet.name}>{diet.name}</option>)}
            {/* <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="lacto vegetarian">Lacto Vegetarian</option>
            <option value="ovo vegetarian">Ovo Vegetarian</option>
            <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescetarian">Pescetarian</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="low fodmap">Low Fodmap</option>
            <option value="whole 30">Whole 30</option>
            <option value="dairy free">Dairy Free</option> */}
        </select>
      </div>
      <div>
        <Link to="/add-new-recipe" id="link-to-add-new-recipe">
          <button className="button-to-add-new-recipe">Add New Recipe!</button>
        </Link>
      </div>
      <div>
        {allRecipes.length > 0
          ? allRecipes.map((recipe, i) => (
            <Link to={`/home-page/${recipe.id}`} key={i}>
              <RecipeCard
                id={recipe.idApi ? recipe.idApi : recipe.id}
                name={recipe.name ||recipe.title}
                image={recipe.image}
                healthScore={recipe.healthScore}
                dishTypes={recipe.dishTypes|| ""}
                diets={recipe.diets}
                />
            </Link>
            ))
          : "No se encontraron recetas para mostrar"}
      </div>
    </div>
  );
}
