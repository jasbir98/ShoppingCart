let express = require('express');
let router = express.Router();
let Product = require('../models/product');
var Cart = require('../models/cart');
/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function (err,docs) {
    if(!err)
      res.render('shop/index', { title: 'Shopping Cart', products: docs, successMsg: successMsg, noMessage: !successMsg});
    else
      console.log(err);
  });
});

router.get('/add-to-cart/:id', function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err,product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product,product.id);
    req.session.cart = cart;
    // console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get('/shopping-cart',function(req,res,next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart', {products: null});
  }

  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout',function(req,res,next){
  if(!req.session.cart){
    return res.render('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});


router.post('/checkout',function(req,res,next){
  if(!req.session.cart){
    return res.render('/shopping-cart');
  }
  // Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_E3E44t6f77zCHVSs4UBATEBw00kZjH4Ggo");

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
const token = req.body.stripeToken; // Using Express
var cart = new Cart(req.session.cart);
  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: 'inr',
    description: 'Test Charge',
    source: token,
  }, function(err,charge){
    if(err){
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    req.flash('success','Successfully bought Product!!');
    req.session.cart = null;
    res.redirect('/');
  });
});

module.exports = router;
