import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipies, alphabeticSort, orderByScore, filterByDiets, getAllDiets } from "../redux/actions/index";
import RecipeCard from "./Recipe-Card";
import SearchBar from "./Search-bar";
import { Link } from "react-router-dom";
import PagedComponent from "./Paged-component";
import styles from "../components/styles/home/home-page.css"
import logo from "../assets/logo.png"
import Loader from "./Loader";

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
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);

  let limitToshow = page * recipesPerPage;
  let firstToShow = limitToshow - recipesPerPage;
  let recipesToShow = allRecipes.slice(firstToShow, limitToshow);
  
  useEffect(() => {
    dispatch(getRecipies());
    dispatch(getAllDiets())
  }, [dispatch]);
  
  function handleSortAlphabetical(e) {
    e.preventDefault();
    dispatch(alphabeticSort(e.target.value));
    setOrder(e.target.value);
    setPage(1)
  }
  function handleScoreSort(e) {
    e.preventDefault();                
    dispatch(orderByScore(e.target.value));
    setOrder(e.target.value);
    setPage(1)
}

function handleTypesOfDiets(e) {
  e.preventDefault();
    dispatch(filterByDiets(e.target.value));
    setPage(1)
  }

function pagedFunction (numberOfPage) {
  setPage(numberOfPage)
}

console.log(allRecipes)
  return (
    <div>
      <nav className="nav-bar">
      <img className="logo-home-page" src={logo} />
      <SearchBar/>
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
          className="selectFilter2"
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
            {allDiets?.map((diet, i) => <option key={i} value={diet.name}>{diet.name}</option>)}: <Loader />
        </select>
      </div>
      <div>
        <Link to="/add-new-recipe" id="link-to-add-new-recipe">
          <button className="button-to-add-new-recipe">Add New Recipe!</button>
        </Link>
      </div>
      </nav>
      <div className="home">
      <PagedComponent recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} pagedFunction={pagedFunction}/>
      <div className="all-recipes-maped">
        {allRecipes.length > 0
          ? recipesToShow.map((recipe, i) => (
            <Link to={`/home-page/${recipe.id}`} key={i} >
              <RecipeCard
                id={recipe.id}
                name={recipe.name ||recipe.title}
                image={recipe.image}
                healthScore={recipe.healthScore}
                dishTypes={recipe.dishTypes|| ""}
                diets={recipe.diets}
                />
            </Link>
            ))
          : <Loader/>}
      </div>
      <PagedComponent recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} pagedFunction={pagedFunction} />
      </div>
    </div>
  );
}
