const express = require('express');
const router = express.Router();
const items = require('../items');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'PCS Music Store', items });
});

router.post('/add-to-cart/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const quantity = req.body.quantity || 1;
  if (!req.session.cart) {
    req.session.cart = {};
  }
  req.session.cart[itemId] = (req.session.cart[itemId] || 0) + parseInt(quantity);
  res.redirect('/');
});

router.get('/cart', (req, res) => {
    const cart = req.session.cart || {};
    const cartItems = [];
    for (const itemId in cart) {
        const item = items.find(item => item.id == itemId);
        if (item) {
            cartItems.push({ 
                name: item.name,
                price: item.price,
                quantity: cart[itemId]
            });
        }
    }
    res.render('cart', { title: 'Your Cart', cartItems });
});

module.exports = router;
