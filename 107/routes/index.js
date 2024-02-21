var express = require('express');
var router = express.Router();

let contacts = [
  {
    id: 1,
    first: 'Joe',
    last: 'Biden',
    email: 'jbiden@whitehouse.gov',
    phone: '123456789'
  },
  {
    id: 2,
    first: 'Kamala',
    last: 'Harris',
    email: 'kharris@whitehouse.gov',
    phone: '987654321'
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', {
    title: 'Express',
    partials: {
      content: 'index'
    },
    contacts,
    noContacts: contacts?.length === 0
  });
});

router.get('/addContact', function (req, res, next) {
  res.render('layout', {
    title: 'Express',
    partials: {
      content: 'addContact'
    }
  });
});

router.post('/addContact', function (req, res, next) {
  contacts.push(req.body);

  res.writeHead(301, {'location': '/'});
  res.end();
});

router.get('/delete/:id', function (req, res, next) {
  contacts = contacts.filter(c => c.id !== Number(req.params.id));

  res.writeHead(301, { 'location': '/' });
  res.end();
});

module.exports = router;