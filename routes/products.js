const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Market = require('../models/Market');
const Price = require('../models/Price');

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

// @desc    Admin can create new products in the database
// @route   POST /products
// @access  Privat
router.get('/new', async function (req, res, next){
    const allProducts = await Product.find({});
    const allMarkets = await Market.find({});
    res.render('newPrice', {productsArr: allProducts, marketsArr: allMarkets});
  })

// @desc    Admin can create new products in the database
// @route   POST /products
// @access  Privat
router.post('/new', /*isLoggedIn,*/ async function (req, res, next) {
  const { price, market, product } = req.body;
  try {
    const createdPrice = await Price.create({ price, market, product });
    res.redirect('/prices', { createdPrice } );
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

// @desc    Edit form products in the database
// @route   POST /edit/:productsId
// @access  Privat
router.get('/edit/:productId', async function (req, res, next) {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    res.render('editProduct', product);
  } catch (error) {
    next(error)
  }
});

// @desc    Admin can edit products in the database
// @route   POST /edit/:productsId
// @access  Privat
router.post('/edit/:productId', async function (req, res, next) {
  const { name, format, image, price  } = req.body;
  const { productId } = req.params;
  try {
    const editedProduct = await Product.findByIdAndUpdate(productId, { name, format, image, price }, { new: true });
    res.redirect(`/products/${editedProduct._id}`);
  } catch (error) {
    next(error)
  }
});

module.exports = router;