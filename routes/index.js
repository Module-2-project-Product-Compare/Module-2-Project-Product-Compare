const router = require('express').Router();
const Product = require('../models/Product');
const Market = require('../models/Market');
const Article = require('../models/Article');

// @desc    App home page
// @route   GET /
// @access  Public
router.get('/', async function (req, res, next) {
    try {        
        const products = await Product.find({});
        res.render('index', {products});
    } catch (error) {
        next(error)
    }
});



module.exports = router;