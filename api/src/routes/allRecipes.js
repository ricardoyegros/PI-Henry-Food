const { Router } = require('express');
const router = Router();
const {Recipe} = require('../db.js');
const axios = require('axios');
const {URL_SPOON, YOUR_API_KEY} = process.env;

router.get( '/', async ( req, res, next ) => {
    let {name} = req.query
    try {
        let recipeListDb = await Recipe.findAll({
            where: {
                name: name
            }
        });
        let recipeListApi = await axios.get(`${URL_SPOON}?apiKey=${YOUR_API_KEY}&addRecipeInformation=true`)
        let recipeName = await recipeListApi.data.results.filter(el => el.title.toLowerCase().includes(name.toLowerCase()));
        let getAllRecipes = [...recipeListDb, ...recipeName];
        if(getAllRecipes.length > 0){
            res.json(getAllRecipes);
        }else{
            res.status(404).send("No se encontraron recetas con ese nombre");
        }
    } catch (error) {
        next(error);        
    }
})

// - [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// - [ ] Resumen del plato
// - [ ] Nivel de "comida saludable" (health score)
// - [ ] Paso a paso

router.get( '/:id', async ( req, res) => {
    let {id} = req.params;
    try {
        if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)){
            let idDb = await Recipe.findAll({
                where:{
                    id: id
                }
            });
            console.log(idDb)
            if(idDb.length > 0){
                let result = idDb.map(elemento => {
                    return {
                        id: elemento.id,
                        name: elemento.name,
                        summary: elemento.summary,
                        healthScore: elemento.healthScore,
                        image: elemento.image,
                        steps: elemento.steps,
                        diets: elemento.diets?.map(e => e.name)
                }})
                //console.log(result)
                res.json(result);
            }else {
                res.status(404).send("No se encontraron recetas con ese id");
            }
        }else{
            let infoFromApi = await axios.get(`${URL_SPOON}?apiKey=${YOUR_API_KEY}&addRecipeInformation=true`)
            let idFromApi = await infoFromApi.data.results.filter(el => el.id == id);
            if(idFromApi.length > 0){
                //console.log(idFromApi);
                let resultFromApi = idFromApi.map(elemento => {
                    return {
                        name: elemento.title, 
                        vegetarian: elemento.vegetarian,
                        vegan: elemento.vegan,
                        glutenFree: elemento.glutenFree,
                        dairyFree: elemento.dairyFree,
                        image: elemento.image, 
                        id: elemento.id, 
                        healthScore: elemento.healthScore, 
                        diets: elemento.diets?.map(d => d),
                        dishTypes: elemento.dishTypes?.map(types => types), 
                        summary: elemento.summary, 
                        steps: elemento.instructions
                }})
                res.json(resultFromApi);
            } else {
                res.status(404).send("No se encontraron recetas con ese id");
            }
        }
    } catch (error) {
        next(error);        
    }
})


module.exports = router;