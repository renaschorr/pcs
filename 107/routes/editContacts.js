// routes/editContact.js

var express = require('express');
var router = express.Router();

// GET request to render the edit contact form
router.get('/:id', function(req, res, next) {
  // Retrieve the contact with the specified id from your data store
  var contactId = req.params.id;
  // Assuming you have a function to fetch contact details by id
  var contact = fetchContactById(contactId);

  // Render the edit contact form and pass the contact details to pre-populate the form
  res.render('editContact', { contact: contact });
});

// POST request to handle form submission and update contact details
router.post('/:id', function(req, res, next) {
  // Retrieve the contact with the specified id from your data store
  var contactId = req.params.id;
  // Assuming you have a function to fetch contact details by id
  var contact = fetchContactById(contactId);

  // Update contact details based on the form submission (req.body)
  contact.firstName = req.body.firstName;
  contact.lastName = req.body.lastName;
  contact.email = req.body.email;
  contact.phone = req.body.phone;

  // Assuming you have a function to update contact details in your data store
  updateContact(contact);

  // Redirect the user back to the main contacts page
  res.redirect('/contacts');
});

module.exports = router;
