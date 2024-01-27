
const Product = require('../models/product')


module.exports.renderSearchRecipes = async (req, res) => {
    const products = await Product.find({locatie: '655e2e7c5a3d53943c6b7c53', printer: 'kitchen'}).populate({path: 'ings.ing', select: 'name, un' })
    const sortedProducts = products.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    res.render('recipe/recipes-search', { sortedProducts, session: req.session })
}


module.exports.viewRecipe = async (req, res) => {
    const {id} = req.params
    const product = await Product.findById(id).populate({path: 'ings.ing', select: 'name um'})
    res.render('recipe/recipe-show', {product})
}



