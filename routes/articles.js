const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Market = require('../models/Market');
const Article = require('../models/Article');
const { isAdmin } = require('../middlewares');


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
router.get('/new', isAdmin, async function (req, res, next){
    const allProducts = await Product.find({});
    const allMarkets = await Market.find({});
    res.render('newArticle', { allProducts, allMarkets });
  });

// @desc    Admin can register new articles in the database
// @route   POST /articles/new
// @access  Private
router.post('/new', isAdmin, async function (req, res, next) {
  const { price, category, market, product } = req.body;
  try {
    const existingProduct = await Article.findOne({ product, market });
    if (existingProduct) {
      res.status(400).send({ message: "The product already exists" });
    } else {
      const createdArticle = await Article.create({ price, category, market, product });
      res.redirect(`/articles/${createdArticle._id}`);
    }
  } catch (error) {
    next(error)
  }
});

// @desc    User can search articles in the database
// @route   POST /articles
// @access  Public
router.get('/search', async function (req, res, next) {
  const { category } = req.query;
  try {
    console.log(req.query);
    
    //const allProducts = await Product.find({});
    //console.log(`---CONSOLE: ${allProducts}`);

    const searchedProducts = await Product.find({ category: { $in: category }})
    console.log(`---CONSOLE: ${searchedProducts}`);


    //const { _id } = searchedProduct;
    console.log(`---CONSOLE222: ${ searchedProduct._id }`)

    res.render('search', { searchedProduct } );
  } catch (error) {
    next(error)
  }
});

/*router.get('/search', async function (req, res, next) {
  const { category } = req.query;
  try {
    const article = await Article.find({ category }).populate('product').populate('market');
    res.render('search', {article} );
  } catch (error) {
    next(error)
  }
});*/

// @desc    Edit form articles in the database
// @route   POST /edit/:articlesId /////////////////////
// @access  Private
router.get('/edit/:articleId', isAdmin, async function (req, res, next) {
  const { articleId } = req.params;
  try {
    const article = await Article.findById(articleId).populate('product').populate('market');
    res.render('editArticle', article);
  } catch (error) {
    next(error)
  }
});

/*router.get('/edit/:articleId', isAdmin, async function (req, res, next) {
  const { articleId } = req.params;
  try {
    const article = await Article.findById(articleId).populate('product').populate('market');
    res.render('editArticle', article);
  } catch (error) {
    next(error)
  }
});*/

// @desc    Admin can edit articles in the database
// @route   POST /edit/:articleId /////////////////////
// @access  Private
router.post('/edit/:articleId', isAdmin, async function (req, res, next) {
  const { price } = req.body;
  const { articleId } = req.params;
  try {
    const editedArticle = await Article.findByIdAndUpdate(articleId, { price }, { new: true }).populate('product').populate('market');
    res.redirect(`/articles/${editedArticle._id}`);
  } catch (error) {
    next(error)
  }
});

/*router.post('/edit/:articleId', isAdmin, async function (req, res, next) {
  const { price } = req.body;
  const { articleId } = req.params;
  try {
    const editedArticle = await Article.findByIdAndUpdate(articleId, { price }, { new: true }).populate('product').populate('market');
    res.redirect(`/articles/${editedArticle._id}`);
  } catch (error) {
    next(error)
  }
});*/

router.post('/delete/:id', isAdmin, async function (req, res, next) {
  const { id } = req.params;
  try {
      await Article.findByIdAndDelete(id);
      res.redirect('/articles');
  } catch (error) {
      next(error)
  }
}); 

// @desc    User can see articles detail
// @route   POST /detail/:articleId
// @access  Public
router.get('/:productId', async function (req, res, next) {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId)
    const productArticles = await Article.find({ product: productId }).populate('market');
    res.render('detail', { product, productArticles });
  } catch (error) {
    next(error)
  }
});

module.exports = router;