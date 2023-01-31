const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @desc    Displays all products
// @route   GET /products
// @access  Public
router.get('/', async function (req, res, next) {
    try {
        const products = await Product.find({});
        res.render('products', { products });
    } catch (error) {
        next(error)
    }
});

router.get('/new', function (req, res, next){
    res.render('newProduct');
  })

// @desc    Admin can create new products in the database
// @route   POST /products
// @access  Private
router.post('/new', /*isLoggedIn,*/ async function (req, res, next) {
  const { category, name, format, image } = req.body;
  try {
    const createdProduct = await Product.create({ category, name, format, image });
    res.redirect('/products', { createdProduct } );
  } catch (error) {
    next(error)
  }
});

module.exports = router;