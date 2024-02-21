//i didn't do the delete part yet but since it said if you can figured id submit the Api worked on and do the delete later

const express = require('express');
const routes = require('./routes');
const contacts = require('./contacts');
const contactsRouter = require('./routes/index');
const app = express();
app.set('view engine', 'ejs');


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

// Routes
app.use('/', routes);
app.get('/', (req, res) => {
    res.render('contacts', { contacts }); 
});


app.get('/contacts', (req, res) => {
    res.render('contacts', { contacts }); 
});
app.get('/addContact', (req, res) => {
    res.render('addContact', { contact: {} }); // Pass an empty contact object to prepopulate the form
  });
  
  
  app.post('/addContact', (req, res) => {
    const newContact = {
      id: contacts.length + 1, 
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };
  
    contacts.push(newContact); // Add the new contact to the contacts array
  
    res.redirect('/contacts'); // Redirect back to the contacts page
  });
  
app.get('/api/contacts', (req, res) => {
    res.json(contacts); // Return contacts array as JSON
});

app.get('/editContact/:id', (req, res) => {
    const contactId = req.params.id;
    const contactIndex = contacts.findIndex(contact => contact.id === parseInt(contactId));
    if (contactIndex !== -1) {
        res.render('editContact', { contact: contacts[contactIndex] });
    } else {
        res.status(404).send('Contact not found');
    }
});

app.post('/editContact/:id', (req, res) => {
    const contactId = req.params.id;
    const contactIndex = contacts.findIndex(contact => contact.id === parseInt(contactId));
    if (contactIndex !== -1) {
        contacts[contactIndex] = { ...contacts[contactIndex], ...req.body };
        res.redirect('/contacts'); // Redirect back to main contacts page
    } else {
        res.status(404).send('Contact not found');
    }
});
app.get('/edit/:id', (req, res) => {
    const contactId = req.params.id;
    // Find the contact with the given ID in the contacts array
    const contact = contacts.find(contact => contact.id === parseInt(contactId));
    if (contact) {
        // If the contact is found, render the edit contact form with the contact data
        res.render('editContact', { contact });
    } else {
        // If the contact is not found, send a 404 error response
        res.status(404).send('Contact not found');
    }
});
app.get('/api/contacts/:id', (req, res) => {
    const contactId = parseInt(req.params.id);
    const contact = contacts.find(contact => contact.id === contactId);

    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ error: 'Contact not found' });
    }
});
app.put('/api/contacts/:id', (req, res) => {
    const contactId = parseInt(req.params.id);
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);

    if (contactIndex !== -1) {
        contacts[contactIndex] = { ...contacts[contactIndex], ...req.body };
        res.sendStatus(204); // No content - success
    } else {
        res.status(404).json({ error: 'Contact not found' });
    }
});
// API Endpoint for Contacts
app.get('/api/contacts', (req, res) => {
    res.json(contacts); // Return contacts array as JSON
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
