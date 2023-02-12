const router = require('express').Router();
const Article = require('../models/Article');
const Product = require('../models/Product');

// @desc    App home page
// @route   GET /
// @access  Public
router.get('/', async function (req, res, next) {
    const user = req.session.currentUser;
    try {        
        const products = await Product.find({});
        const articles = await Article.find({});
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        res.render('index', { products, articles, uniqueCategories, user });
    } catch (error) {
        next(error)
    }
});

module.exports = router;