// Im still working on this one....



const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'yada',
  password: 'yadayada',
  database: 'recipes_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

// Routes
// Get all recipes
app.get('/recipes', (req, res) => {
  db.query('SELECT name, category FROM recipes', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving recipes');
    } else {
      res.json(results);
    }
  });
});

// Get a single recipe
app.get('/recipes/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM recipes WHERE id = ?', id, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving recipe');
    } else if (results.length === 0) {
      res.status(404).send('Recipe not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Add a recipe
app.post('/recipes', (req, res) => {
  const { name, category, ingredients, instructions } = req.body;
  db.query('INSERT INTO recipes (name, category, ingredients, instructions) VALUES (?, ?, ?, ?)',
    [name, category, ingredients, instructions], (err, result) => {
      if (err) {
        res.status(500).send('Error adding recipe');
      } else {
        res.status(201).send('Recipe added successfully');
      }
    });
});

// Update a recipe
app.put('/recipes/:id', (req, res) => {
  const id = req.params.id;
  const { name, category, ingredients, instructions } = req.body;
  db.query('UPDATE recipes SET name = ?, category = ?, ingredients = ?, instructions = ? WHERE id = ?',
    [name, category, ingredients, instructions, id], (err, result) => {
      if (err) {
        res.status(500).send('Error updating recipe');
      } else if (result.affectedRows === 0) {
        res.status(404).send('Recipe not found');
      } else {
        res.send('Recipe updated successfully');
      }
    });
});

// Delete a recipe
app.delete('/recipes/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM recipes WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).send('Error deleting recipe');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Recipe not found');
    } else {
      res.send('Recipe deleted successfully');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
