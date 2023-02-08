const express = require('express');
const router = express.Router();
const User = require('../models/User');
const isLoggedIn  = require('../middlewares');

// @desc    Displays user profile view
// @route   GET /profile
// @access  Private
router.get('/profile', isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render('auth/profile', user);
  console.log(user);
});

// @desc    Displays form view to edit user profile
// @route   GET /profile/edit
// @access  Private
router.get('/profile/edit', isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render('auth/profileEdit', user);
});

// @desc    Sends the changes made to the user profile
// @route   POST /profile/edit
// @access  Private
router.post('/profile/edit', isLoggedIn, async function (req, res, next) {
  const { username, image } = req.body;
  if (!username) {
    console.log('user is not logged in');
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

module.exports = router;