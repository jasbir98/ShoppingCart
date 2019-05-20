let express = require('express');
let router = express.Router();
let csrf = require('csurf');
let csrfProtection = csrf();
let passport = require('passport');
// For each route through router we will have csrf Protection
router.use(csrfProtection);


// Placing it above all the routes as line 15 will use notloggedin functionality with all the routes.
router.get('/profile', isLoggedIn ,function(req,res,next){
  res.render('user/profile');
});
router.get('/logout', isLoggedIn, function(req,res,next){
  req.logout();
  res.redirect('/');
});
router.use('/', notLoggedIn, function(req,res,next){
  next();
});
router.get('/signup',function(req,res,next){
	var messages = req.flash('error');
  res.render('user/signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/user/profile',
	failureRedirect: '/user/signup',
	failureFlash: true
}));



router.get('/signin',function(req,res,next){
  var messages = req.flash('error');
  res.render('user/signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});  
});

router.post('/signin', passport.authenticate('local.signin',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));


module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};
function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};