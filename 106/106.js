const express = require('express');
const app = express();
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to parse numbers from query parameters or route parameters
const parseNumbers = (req, res, next) => {
  const num1 = parseFloat(req.query.num1 || req.params.num1);
  const num2 = parseFloat(req.query.num2 || req.params.num2);

  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('Invalid number(s) provided');
  } else {
    req.num1 = num1;
    req.num2 = num2;
    next();
  }
};

// Middleware to parse operator
const parseOperator = (req, res, next) => {
  const operator = req.query.operator || req.params.operator;
  if (operator !== '+' && operator !== '-' && operator !== '*' && operator !== '/') {
    res.status(400).send('Invalid operator provided');
  } else {
    req.operator = operator;
    next();
  }
};


app.get('/', (req, res) => {
  res.render('home');
});
app.get('/add/:num1/:num2', parseNumbers, (req, res) => {
  const result = req.num1 + req.num2;
  res.render('add', { num1: req.num1, num2: req.num2, result });
});

// Subtract endpoint
app.get('/subtract/:num1/:num2', parseNumbers, (req, res) => {
  const result = req.num1 - req.num2;
  res.render('subtract', { num1: req.num1, num2: req.num2, result });
  
});

// Arithmetic operation endpoint
app.get('/calculate/:num1/:num2/:operator', parseNumbers, parseOperator, (req, res) => {
  const { num1, num2, operator } = req;
  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
      break;
    default:
      result = 'Invalid operator';
  }

  res.render('calculate', { num1, num2, operator, result });
});

app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
