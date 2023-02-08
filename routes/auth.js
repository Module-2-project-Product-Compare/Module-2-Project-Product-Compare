const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const isLoggedIn  = require('../middlewares');
// const isLoggedOut  = require('../middlewares');

// @desc    Displays form view to sign up
// @route   GET /auth/signup
// @access  Public
router.get('/signup', /*isLoggedOut,*/ async (req, res, next) => {
  res.render('auth/signup');
});

// @desc    Sends user auth data to database to create a new user
// @route   POST /auth/signup
// @access  Public
router.post('/signup', /*isLoggedOut,*/ async (req, res, next) => {
  const { email, password, username } = req.body;
  // ⚠️ Add validations! ////////// shows auth code
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, hashedPassword });
    res.render('auth/profile', user)
  } catch (error) {
    next(error)
  }
});

// @desc    Displays form view to log in
// @route   GET /auth/login
// @access  Public
router.get('/login', /*isLoggedOut,*/ async (req, res, next) => {
  res.render('auth/login');
});

// @desc    Sends user auth data to database to authenticate user
// @route   POST /auth/login
// @access  Public
router.post('/login', /*isLoggedOut,*/ async (req, res, next) => {
  const { email, password } = req.body;
  // ⚠️ Add validations!
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.render('auth/login', { error: "User not found" });
      return;
    } else {
      const match = await bcrypt.compare(password, user.hashedPassword);
      if (match) {
        // Remember to assign user to session cookie:
        req.session.currentUser = user;
        res.redirect('/');
      } else {
        res.render('auth/login', { error: "Unable to authenticate user" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Destroy user session and log out
// @route   GET /auth/logout
// @access  Private 
router.get('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err)
    } else {
      res.clearCookie('markget-cookie');
      res.redirect('/');
    }
  });
});

module.exports = router;