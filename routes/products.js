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
// @access  Privat
router.post('/new', /*isLoggedIn,*/ async function (req, res, next) {
  const { name, format, image, price } = req.body;
  try {
    const createProduct = await Product.create({ name, format, image, price });
    res.redirect('/products', { createProduct } );
  } catch (error) {
    next(error)
  }
});

// @desc    User can search products in the database
// @route   POST /products
// @access  Public
router.get('/search', async function (req, res, next) {
  const { name } = req.query;
  try {
    const product = await Product.findOne({ name: name });
    res.render('search', { query: name, product: product });
  } catch (error) {
    next(error)
  }
});

module.exports = router;