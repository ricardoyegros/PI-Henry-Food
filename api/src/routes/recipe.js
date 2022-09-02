const { Router } = require('express');
const router = Router();
const {Recipe, Diet} = require('../db.js');

router.post('/', async (req, res, next) => {
    // res.send('soy el post de recipe')
    let {name, summary, healthScore, image, steps, diets} = req.body;
    try {
        let recipeN = await Recipe.create({
            name,
            summary,
            healthScore,
            image,
            steps
        })
        let dietN = await Diet.findAll({
            where: {name: diets}
        })
        recipeN.addDiet(dietN);
        res.json(recipeN);
    } catch (error){
        next(error);
    }
});

module.exports = router;