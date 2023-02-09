const router = require('express').Router();
const Product = require('../models/Product');
const Market = require('../models/Market');
const Article = require('../models/Article');

// @desc    App home page
// @route   GET /
// @access  Public
router.get('/', async function (req, res, next) {
    try {
        const articles = await Article.find({}).populate('product').populate('market');
        const randomArticles = [];
        for (let i = 0; i < 20; i++) {
            const randomIndex = Math.floor(Math.random() * articles.length);
            randomArticles.push(articles[randomIndex]);
        }
        res.render('index', {articles: randomArticles});
    } catch (error) {
        next(error)
    }
});


module.exports = router;
