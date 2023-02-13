const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Highlighted = require('../models/Highlighted');
// const Product = require('../models/Product');
// const Market = require('../models/Market');
// const Article = require('../models/Article');
const { isLoggedIn } = require('../middlewares');
const Article = require('../models/Article');

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
router.get('/highlighted', isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render('highlighted', { user });
});

// @desc    Create new highlighted article
// @route   POST /highlighted
// @access  Private
router.post('/highlighted/:articleId', isLoggedIn, async function (req, res, next) {
  const thisUser = req.session.currentUser;
  const { articleId } = req.params;
  try {
    const existingHighlighted = await Highlighted.findOne({ thisArticle: articleId });
    if (existingHighlighted) {
    res.status(400).send({ message: "This article is already highlighted" });
    } else {
    const thisArticle = await Article.findById(articleId);
    const highlightedArticle = await Highlighted.create({ thisArticle, thisUser });
    res.redirect('/highlighted');
    }
  } catch (error) {
      next(error)
  }
});

module.exports = router;