// routes/apiContacts.js

var express = require('express');
var router = express.Router();

// Middleware to handle GET requests to /api/contacts
router.get('/', function(req, res, next) {
  // Assuming you have a contacts array containing contact objects
  var contacts = getContactsFromDataStore();

  // Return the contacts array as JSON
  res.json(contacts);
});

module.exports = router;
