const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const allRecipesRouter = require('./allRecipes');
const dietsRouter = require('./diets');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/diets', dietsRouter);
router.use('/recipes', allRecipesRouter);

module.exports = router;
