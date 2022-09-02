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

router.get( '/:id', async ( req, res) => {
    let {id} = req.params;
    try {
        if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)){
            let idDb = await Recipe.findAll({
                where:{
                    id: id
                }
            });
            if(idDb.length > 0){
                res.send(idDb)
            }else {
                res.status(404).send("No se encontraron recetas con ese id");
            }
        }else{
            let infoFromApi = await axios.get(`${URL_SPOON}?apiKey=${YOUR_API_KEY}&addRecipeInformation=true`)
            let idFromApi = await infoFromApi.data.results.filter(el => el.id == id);
            if(idFromApi.length > 0){
                //console.log(idFromApi);
                res.json(idFromApi);
            } else {
                res.status(404).send("No se encontraron recetas con ese id");
            }
        }
    } catch (error) {
        next(error);        
    }
})


module.exports = router;