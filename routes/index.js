let express = require('express');
let router = express.Router();
let Product = require('../models/product');
let csurf = require('csurf');
let csrfProtection = csurf();
// For each route through router we will have csrf Protection
router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function (err,docs) {
    if(!err)
      res.render('shop/index', { title: 'Shopping Cart', products: docs});
    else
      console.log(err);
  });

});

router.get('/user/signup',function(req,res,next){
  res.render('user/signup',{csrfToken: req.csrfToken()});
});

router.post('/user/signup',function (req,res,next){
    res.redirect('/');
});

module.exports = router;
