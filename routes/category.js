const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Market = require('../models/Market');
const Article = require('../models/Article');
const { isAdmin } = require('../middlewares');

router.get('/category/:category', async function (req, res, next) {
    const user = req.session.currentUser;
    const { category } = req.params;
    try {        
        const products = await Product.find({ category });
        res.render('category', { products, user });
    } catch (error) {
        next(error)
    }
});


module.exports = router;