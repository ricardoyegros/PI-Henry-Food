const { Router } = require("express");
const router = Router();
const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
const { URL_SPOON, YOUR_API_KEY } = process.env;
const { Op } = require("sequelize");


router.post("/", async (req, res, next) => {
  // res.send('soy el post de recipe') 1
  let { name, summary, healthScore, image, steps, dishTypes, diets } = req.body;
  try {
    let recipeN = await Recipe.create({
      name,
      summary,
      healthScore,
      image,
      steps,
      dishTypes,
    });
    let dietN = await Diet.findAll({
      where: { name: diets },
    });
    recipeN.addDiet(dietN);
    res.json(recipeN);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  let { name } = req.query;
  try {
    if (name) {
      let recipeListDb = await Recipe.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        include: Diet,
      });
      let recipeListApi = await axios.get(
        `${URL_SPOON}?number=100&apiKey=${YOUR_API_KEY}&addRecipeInformation=true`
      ); // .then(data => data.results.filter(el => el.title.toLowerCase().includes(name.toLowerCase()));
      let recipeName = await recipeListApi.data.results.filter((el) =>
        el.title.toLowerCase().includes(name.toLowerCase())
      );
      let getAllRecipes = [...recipeListDb, ...recipeName];
      if (getAllRecipes.length > 0) {
        res.json(getAllRecipes);
      } else {
        res.status(404).send("No se encontraron recetas con ese nombre");
      }
    } else {
      let array = [];
      let allRecipesFromApi = await axios
        .get(`${URL_SPOON}?number=100&apiKey=${YOUR_API_KEY}&addRecipeInformation=true`)
        .then((el) => el.data.results);
      allRecipesFromApi?.map((el) =>
        array.push({
          id: el.id,
          name: el.title,
          summary: el.summary,
          healthScore: el.healthScore,
          dishTypes: el.dishTypes[0],
          image: el.image,
          steps: el.analyzedInstructions[0]?.steps.map(e =>e.step).join(),
          diets: el.vegetarian
            ? [ ...el.diets, "vegetarian"]
            : el.diets.map((nd) => nd + " "),
        })
      );
      let allRecipesFromDb = await Recipe.findAll({ include: Diet });
      let resultFromDb 
      if(allRecipesFromDb.length > 0){
          resultFromDb = allRecipesFromDb.map((elemento) => {
            return {
              id: elemento.id,
              name: elemento.name,
              summary: elemento.summary.replace(/<[^>]+>/g, ""),
              healthScore: elemento.healthScore,
              image: elemento.image,
              steps: elemento.steps,
              diets: elemento.diets.map(d => d.name)
            };
          });
        } else{
          resultFromDb = [];
        }
      let finalRecipes = array.concat(resultFromDb) 
      res.json(finalRecipes);
    }
  } catch (error) {
    next(error);
  }
});

// - [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// - [ ] Resumen del plato
// - [ ] Nivel de "comida saludable" (health score)
// - [ ] Paso a paso

router.get("/:id", async (req, res, next) => {
  let { id } = req.params;
  try {
    let Diets = [];
    if (
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      let idDb = await Recipe.findAll({
        where: {
          id: id,
        },
        include: Diet,
      });
      if (idDb.length > 0) {
        let result = idDb.map((elemento) => {
          return {
            id: elemento.id,
            name: elemento.name,
            summary: elemento.summary.replace(/<[^>]+>/g, ""),
            healthScore: elemento.healthScore,
            image: elemento.image,
            steps: elemento.steps,
            diets: elemento.diets.map(d => d.name)
          };
        });
        res.json(result);
      } else {
        res.status(404).send("No se encontraron recetas con ese id");
      }
    } else {
      let infoFromApi = await axios.get(
        `${URL_SPOON}?number=100&apiKey=${YOUR_API_KEY}&addRecipeInformation=true`
      );
      let idFromApi = await infoFromApi.data.results.filter(
        (el) => el.id == id
      );
      if (idFromApi.length > 0) {
        let resultFromApi = idFromApi.map((elemento) => {
          return {
            name: elemento.title,
            vegetarian: elemento.vegetarian,
            vegan: elemento.vegan,
            glutenFree: elemento.glutenFree,
            dairyFree: elemento.dairyFree,
            image: elemento.image,
            id: elemento.id,
            healthScore: elemento.healthScore,
            diets: elemento.vegetarian
              ? [...elemento.diets , "vegetarian"]
              : elemento.diets.map((nd) => nd),
            dishTypes: elemento.dishTypes?.map((types) => types),
            summary: elemento.summary.replace(/<[^>]+>/g, ""),
            steps: elemento.analyzedInstructions[0]?.steps.map(e =>e.step).join(),
          };
        });
        res.json(resultFromApi);
      } else {
        res.status(404).send("No se encontraron recetas con ese id");
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
