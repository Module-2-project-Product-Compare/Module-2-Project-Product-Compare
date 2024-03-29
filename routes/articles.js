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
        const articles = await Article.find({}).populate('product').populate('market');
        res.render('articles', {articles});
    } catch (error) {
        next(error)
    }
});

// @desc    Admin can register new articles in the database
// @route   GET /articles/new
// @access  Private
router.get('/new', isAdmin, async function (req, res, next){
  const user = req.session.currentUser;
  const allProducts = await Product.find({});
  const allMarkets = await Market.find({});
  res.render('newArticle', { allProducts, allMarkets, user });
});

// @desc    Admin can register new articles in the database
// @route   POST /articles/new
// @access  Private
router.post('/new', isAdmin, async function (req, res, next) {
  const { price, category, market, product } = req.body;
  try {
    const existingProduct = await Article.findOne({ price, category, market, product  });
    if (existingProduct) {
        const user = req.session.currentUser;
        const allProducts = await Product.find({});
        const allMarkets = await Market.find({});
      res.render(`newArticle`, { allProducts, allMarkets, user, message: "The article already exists" });
    } else {
        const user = req.session.currentUser;
        const allProducts = await Product.find({});
        const allMarkets = await Market.find({});
      const createdArticle = await Article.create({ price, category, market, product });
      res.render(`newArticle`, { allProducts, allMarkets, user, messageTwo: "Article created successfully,"});
    }
  } catch (error) {
    next(error)
  }
});

// @desc    User can search articles in the database
// @route   POST /articles
// @access  Public
router.get('/search', async function (req, res, next) {
  const user = req.session.currentUser;
  const { category } = req.query;
  try {
    const searchedProducts = await Product.find({ category });
    res.render('search', { searchedProducts, category, user } );
  } catch (error) {
    next(error)
  }
});




// @desc    Edit form articles in the database
// @route   POST /editArticle/:articlesId /////////////////////
// @access  Private
router.get('/editArticle/:articleId', isAdmin, async function (req, res, next) {
  const user = req.session.currentUser;
  const { articleId } = req.params;
  try {
    const article = await Article.findById(articleId);
    res.render('editArticle', { article, user });
  } catch (error) {
    next(error)
  }
});

// @desc    Admin can edit articles in the database
// @route   POST /editArticle/:articleId /////////////////////
// @access  Private
router.post('/editArticle/:articleId', isAdmin, async function (req, res, next) {
  const { price } = req.body;
  const { articleId } = req.params;
  try {
    const editedArticle = await Article.findByIdAndUpdate(articleId, { price }, { new: true });
    const productId = editedArticle.product;
    const lastProduct = await Product.findById(productId);
    res.redirect(`/articles/${lastProduct._id}`);
  } catch (error) {
    next(error)
  }
});

// @desc    Edit form products in the database
// @route   POST /edit/:productsId
// @access  Private
router.get('/edit/:productId', isAdmin, async function (req, res, next) {
  const user = req.session.currentUser;
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    res.render('editProduct', { product, user });
  } catch (error) {
    next(error)
  }
});

// @desc    Admin can edit articles in the database
// @route   POST /edit/:productsId
// @access  Private
router.post('/edit/:productId', isAdmin, async function (req, res, next) {
  const { category, name, image } = req.body;
  const { productId } = req.params;
  try {
    const editedProduct = await Product.findByIdAndUpdate(productId, { category, name, image }, { new: true });
    res.redirect(`/articles/${editedProduct._id}`);
  } catch (error) {
    next(error)
  }
});

// @desc    Admin can delete articles in the database
// @route   POST /delete/:id
// @access  Private
router.post('/delete/:id', isAdmin, async function (req, res, next) {
  const { id } = req.params;
  try {
     const deleteArticle = await Article.findByIdAndDelete(id);
        const productId = deleteArticle.product;
        const lastProduct = await Product.findById(productId);
      res.redirect(`/articles/${lastProduct._id}`);
  } catch (error) {
      next(error)
  }
});


// @desc    User can see articles detail
// @route   POST /detail/:articleId
// @access  Public
router.get('/:productId', async function (req, res, next) {
  const user = req.session.currentUser;
  let showAdminBtns = undefined;
  if (user){
    const userRole = user.role;
    if (userRole === "admin") {
       showAdminBtns = true;
    } else {
        showAdminBtns = false;
    };
  };
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId)
    const productArticles = await Article.find({ product: productId }).populate('market').sort({price:1});
    let isCheapest = true;
    const cheapestArticle = productArticles[0];
    productArticles.forEach((article) => {
      if(showAdminBtns){
        article.userAdmin = true;
      }
      if (article.price !== cheapestArticle.price) {
        isCheapest = false;
      }
      article.isCheapest = isCheapest;
      isCheapest = true;
    });
    res.render('detail', { product, productArticles, user, showAdminBtns });
  } catch (error) {
    next(error)
  }
});

module.exports = router;