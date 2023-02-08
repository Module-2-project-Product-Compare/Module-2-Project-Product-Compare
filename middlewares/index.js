module.exports = isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/login')
  } else {
    console.log(`CURRENT USER: ${req.session.currentUser}`);
    next()
  }
};

// module.exports = isLoggedOut = (req, res, next) => {
//   if (req.session.currentUser) {
//     res.redirect('/')
//   } else {
//     next()
//   }
// };

// module.exports = isAdmin = (req, res, next) => {
//   if (req.session.currentUser.role === 'admin') {
//     next()
//   } else {
//     res.redirect('/auth/login')
//   }
// };