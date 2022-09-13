const { axios } = require('axios');
const { Router } = require('express');
const router = Router();
const {Diet} = require('../db.js');

router.get( '/', async ( req, res, next ) => {
    let defaultDietsFromApi = ['gluten free','ketogenic', 'Vegetarian', 'lacto ovo vegetarian', 'vegan', 'pescatarian', 'paleolithic', 'primal', 'fodmap friendly', 'whole 30'];
    try {
        defaultDietsFromApi.forEach(diet => Diet.findOrCreate({
        where: {
            name : diet
        }
    }))
    let typesOfDietsInDb = await Diet.findAll();
    res.json(typesOfDietsInDb);
    } catch (error) {
        next(error);        
    }
})

module.exports = router;