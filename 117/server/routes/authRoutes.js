const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
console.log("in the authrout");
// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
