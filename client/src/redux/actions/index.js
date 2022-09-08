import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const ALPHABETIC_SORT = "ALPHABETIC_SORT";
export const SORT_BY_SCORE = "SORT_BY_SCORE";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const SEARCH_BAR = "SEARCH_BAR";
export const RECIPE_DETAILS = "RECIPE_DETAILS";
export const ADD_NEW_RECIPE = "ADD_NEW_RECIPE";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
//import {axios} from "axios";
//let n = axios.get("localhost:3001/api/recipes").then(res => res.data)

export function getRecipies() {
  return async function (dispatch) {
    try {
      let allR = await axios.get("http://localhost:3001/api/recipes/");
      return dispatch({
        type: GET_RECIPES,
        payload: allR.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function findFromSearchBar(payload) {
  return function (dispatch) {
    let recipesBySearchBar = axios
      .get(`http://localhost:3001/api/recipes/?name=${payload}`)
      .then((results) => dispatch({ type: SEARCH_BAR, payload: results.data }))
      .catch((error) => alert("No se encontraron recetas con este nombre"));
  };
}
export function alphabeticSort(payload) {
  return {
    type: ALPHABETIC_SORT,
    payload,
  };
}

export function orderByScore(payload) {
  return {
    type: SORT_BY_SCORE,
    payload,
  };
}

export function filterByDiets(payload) {
  return {
    type: FILTER_BY_DIETS,
    payload,
  };
}

export function recipesDetails(payload) {
  return async function (dispatch) {
    try {
      let recipeId = await axios.get(`http://localhost:3001/api/recipes/${payload}`);
      return dispatch({ type: RECIPE_DETAILS, payload: recipeId.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addNewRecipetoReducer(payload) {
  console.log(payload)
  return function (dispatch) {
    let newRecipe = axios
      .post(`http://localhost:3001/api/recipes/`, payload)
      .catch((error) => console.log(error));
  };
}

export function getAllDiets (payload) {
  return async function (dispatch) {
    let allDiets = await axios.get("http://localhost:3001/api/diets")
    return dispatch({type: GET_ALL_DIETS, payload: allDiets.data})
  }
}
