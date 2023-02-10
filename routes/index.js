const router = require('express').Router();
const Product = require('../models/Product');

// @desc    App home page
// @route   GET /
// @access  Public
router.get('/', async function (req, res, next) {
    const user = req.session.currentUser;
    try {        
        const products = await Product.find({});
        res.render('index', { products, user });
    } catch (error) {
        next(error)
    }
});

module.exports = router;