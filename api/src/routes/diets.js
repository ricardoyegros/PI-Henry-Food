const { axios } = require('axios');
const { Router } = require('express');
const router = Router();
const {Diet} = require('../db.js');

router.get( '/', async ( req, res, next ) => {
    let defaultDietsFromApi = ['Gluten Free','Ketogenic', 'Vegetarian','Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'];
    try {
        defaultDietsFromApi.forEach(diet => Diet.findOrCreate({
            where: {
                name : diet
            }
        }))
        let typesD = await Diet.findAll();
        res.json(typesD);
    } catch (error) {
        next(error);        
    }
})

module.exports = router;