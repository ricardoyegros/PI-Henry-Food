import { GET_RECIPES, ALPHABETIC_SORT, SORT_BY_SCORE, FILTER_BY_DIETS, SEARCH_BAR,RECIPE_DETAILS, GET_ALL_DIETS} from "../actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  allDiets: []
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case ALPHABETIC_SORT:
      let sortedRecipes =
        action.payload === "a-z"
          ? state.allRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          : state.allRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            });
      return {
        ...state,
        recipes: sortedRecipes,
      };
    case SORT_BY_SCORE:
      let recipesSortByScore =
        action.payload === "maxScore"
          ? state.allRecipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              return 0;
            })
          : state.allRecipes.sort(function (a, b) {
              if (a.healthScore < b.healthScore) return 1;
              if (a.healthScore > b.healthScore) return -1;
              return 0;
            });
      return {
        ...state,
        recipes: recipesSortByScore,
      };
    case FILTER_BY_DIETS:
      let dietsFiltered = state.allRecipes
      let resultDietsFiltered = dietsFiltered.filter(el => el.diets.some(e => e.toLowerCase() == action.payload.toLowerCase()))
      console.log(resultDietsFiltered)
      return {
        ...state,
        recipes: resultDietsFiltered
      }
    case SEARCH_BAR:
      return{
        ...state,
        recipes: action.payload
      }
    case RECIPE_DETAILS:
      return{
        ...state,
        allRecipes: action.payload
      }
    case GET_ALL_DIETS:
      return {
        ...state,
        allDiets: action.payload
      }
    default:
      return state;
  }
}
