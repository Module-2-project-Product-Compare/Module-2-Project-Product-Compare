const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Market = require('../models/Market');
const Article = require('../models/Article');

// @desc    Displays all articles
// @route   GET /articles
// @access  Public
router.get('/', async function (req, res, next) {
    try {
        const article = await Article.find({}).populate('product').populate('market');
        res.render('articles', {article});
    } catch (error) {
        next(error)
    }
});

// @desc    Admin can register new articles in the database
// @route   GET /articles/new
// @access  Private
router.get('/new', async function (req, res, next){
    const allProducts = await Product.find({});
    const allMarkets = await Market.find({});
    res.render('newArticle', { allProducts, allMarkets });
  });

// @desc    Admin can register new articles in the database
// @route   POST /articles/new
// @access  Private
router.post('/new', /*isLoggedIn,*/ async function (req, res, next) {
  const { price, market, product } = req.body;
  // const { productId } = req.params;
  // const { marketId } = req.params;
  try {
    price
    const createdArticle = await Article.create({ price, market, product });
    console.log(product)
    res.redirect(`/articles/${createdArticle._id}`);
  } catch (error) {
    next(error)
  }
});

// @desc    User can search articles in the database
// @route   POST /articles
// @access  Public
router.get('/search', async function (req, res, next) {
  const { name } = req.query;
  try {
    const article = await Article.findOne({ name: name });
    res.render('search', { query: name, article: article });
  } catch (error) {
    next(error)
  }
});

// @desc    Edit form articles in the database
// @route   POST /edit/:articlesId
// @access  Private
router.get('/edit/:articleId', async function (req, res, next) {
  const { articleId } = req.params;
  try {
    const article = await Article.findById(articleId);
    res.render('editArticle', article);
  } catch (error) {
    next(error)
  }
});

// @desc    Admin can edit articles in the database
// @route   POST /edit/:articleId
// @access  Private
router.post('/edit/:articleId', async function (req, res, next) {
  const { price } = req.body;
  const { articletId } = req.params;
  try {
    const editedArticle = await Article.findByIdAndUpdate(articletId, { price }, { new: true });
    res.redirect(`/articles/${editedArticle._id}`);
  } catch (error) {
    next(error)
  }
});

// @desc    User can see articles detail
// @route   POST /detail/:articleId
// @access  Public
router.get('/:articleId', async function (req, res, next) {
  const { articleId } = req.params;
  try {
    const article = await Article.findById(articleId).populate('product').populate('market');
    console.log(article);
    res.render('detail', article );
  } catch (error) {
    next(error)
  }
});

module.exports = router;