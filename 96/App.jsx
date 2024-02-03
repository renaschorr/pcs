import React, { useState } from 'react';
import './style.css';
import recipesData from './recipes.js'


const RecipeDetails = ({ recipe }) => {
  const { name, ingredients, picture } = recipe;
  return (
    <div className="recipe">
      <h2>{name}</h2>
      <img src={picture} alt={name} />
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export function App(props) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeSelect = (event) => {
    const selectedRecipeName = event.target.value;
    setSelectedRecipe(selectedRecipeName);
  };

  return (
    <body>
      <div className='App'>
        <h1>PCS Recipes</h1>
        <select id="recipes" onChange={handleRecipeSelect}>
          <option hidden>Please choose a recipe</option>
          {recipesData.map(recipe => (
            <option key={recipe.name} value={recipe.name}>{recipe.name}</option>
          ))}
        </select>

        {selectedRecipe && <RecipeDetails recipe={recipesData.find(recipe => recipe.name === selectedRecipe)} />}
      </div>
    </body>
  );
}

// Log to console
console.log('Hello console');
