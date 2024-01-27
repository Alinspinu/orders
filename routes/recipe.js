const express = require("express");
const router = express.Router();


const recipeControlers = require('../controlers/recipes')

router.route('/').get(recipeControlers.renderSearchRecipes)
router.route('/:id').get(recipeControlers.viewRecipe)



module.exports = router