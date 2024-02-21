
const express = require('express');
const router = express.Router();
const data = require('./data');
const contacts = require('./contacts');



router.get('/', (req, res) => {
    res.render('contacts', { contacts: data.contacts, noContacts: !data.contacts.length });
});


router.get('/delete/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id); // Parse id to an integer
    data.contacts = data.contacts.filter(contact => contact.id !== idToDelete);
    res.redirect('/');
});


module.exports = router;
