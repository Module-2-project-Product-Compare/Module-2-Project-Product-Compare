const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Highlighted = require('../models/Highlighted');
const Product = require('../models/Product');
const Market = require('../models/Market');
const Article = require('../models/Article');
const { isLoggedIn } = require('../middlewares');

// @desc    Displays user profile view
// @route   GET /profile
// @access  Private
router.get('/profile', isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render('auth/profile', { user });
});

// @desc    Displays form view to edit user profile
// @route   GET /profile/edit
// @access  Private
router.get('/profile/edit', isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render('auth/profileEdit', { user });
});

// @desc    Sends the changes made to the user profile
// @route   POST /profile/edit
// @access  Private
router.post('/profile/edit', isLoggedIn, async function (req, res, next) {
  const { username, image } = req.body;
  if (!username) {
    send.status(404);
  }
  const user = req.session.currentUser;
  try {
    const userInDB = await User.findByIdAndUpdate(user._id, { username, image }, { new: true });
    req.session.currentUser = userInDB;
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});

// @desc    Deletes the user profile
// @route   GET /profile/delete
// @access  Private
  router.get('/profile/delete/:userId', isLoggedIn, async function (req, res, next) {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        await User.deleteOne({ _id: userId });
        res.clearCookie('markget-cookie');
        res.redirect('/');
    } catch (error) {
        next(error)
    }
  });

// @desc    Displays highlighted view
// @route   GET /highlighted
// @access  Private
router.get('/highlighted', isLoggedIn, async function (req, res, next) {
  const user = req.session.currentUser;
      let showAdminBtns = undefined;
    if (user){
        const userRole = user.role;
    if (userRole === "admin") {
        showAdminBtns = true;
    } else {
        showAdminBtns = false;
    }};
  try {
    const highlighteds = await Highlighted.find({user: user._id})
    .populate({
      path: 'article',
      populate: { path: 'market' } })
    .populate({
      path: 'article',
      populate: { path: 'product' } })
    res.render('highlighted', { user, highlighteds, showAdminBtns });
  } catch (error) {
     next(error)
 }
});

// @desc    Create new highlighted article
// @route   POST /highlighted
// @access  Private
router.post('/highlighted/:articleId', isLoggedIn, async function (req, res, next) {
  const user = req.session.currentUser;
  const { articleId } = req.params;
  try {
    const existingHighlighted = await Highlighted.findOne({ article: articleId });
    if (existingHighlighted) {
    res.status(400).send({ message: "This article is already highlighted" });
    } else {
    const article = await Article.findById(articleId);
    const highlightedArticle = await Highlighted.create({ article, user });
    res.redirect('/highlighted');
    }
  } catch (error) {
      next(error)
  }
});

// @desc    Admin can delete articles in the database
// @route   POST /delete/:id
// @access  Private
router.post('/delete/:id', isLoggedIn, async function (req, res, next) {
  const { id } = req.params;
  try {
    const deleteHighlighted = await Highlighted.findByIdAndDelete(id);
    const highId = deleteHighlighted.article;
    await Article.findById(highId)
      res.redirect('/highlighted');
  } catch (error) {
      next(error)
  }
});

module.exports = router;