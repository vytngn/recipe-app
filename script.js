console.clear();

let recipeList = [
  {
    name: 'Mashed Potatoes',
    ingredients: ['potatoes', 'garlic', 'butter', 'milk', 'cream cheese'],
  },
  {
    name: 'Green Bean Casserole',
    ingredients: [
      'green beans',
      'flour',
      'butter',
      'garlic powder',
      'onion powder',
      'nutmeg',
      'dijon mustard',
      'heavy cream',
    ],
  },
];

// Your javascript application code should be written BELOW THIS COMMENT

// Function to display saved recipe on the page
function displayRecipe(recipe){
  // create recipe container 
  const recipeDiv = document.createElement('div');
  recipeDiv.className = 'recipe';

  // add recipe name
  const recipeHeading = document.createElement('h3');
  recipeHeading.textContent = recipe.name;
  recipeDiv.appendChild(recipeHeading);

  //create the unordered ingredients list
  const ingredientList = document.createElement('ul');

  // add each ingredient as a list item
  for(let i = 0 ; i < recipe.ingredients.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = recipe.ingredients[i];
    ingredientList.appendChild(listItem);
  }
  
  // add the ingredients list to recipe box 
  recipeDiv.appendChild(ingredientList);

  // add recipe box to saved recipes section 
  document.getElementById('recipeList').appendChild(recipeDiv);
}

// This function shows all recipes
function displayAllRecipes() {
  // Clear current recipes
  document.getElementById('recipeList').innerHTML = '';
  
  // Show each recipe in the array 
  for (let i = 0; i < recipeList.length; i++) {
    displayRecipe(recipeList[i]);
  }
}

// ========== STORAGE FUNCTIONS ==========

// Save recipes to localStorage
function saveRecipes() {
  localStorage.setItem('recipes', JSON.stringify(recipeList));
  console.log('Recipes saved to localStorage:', recipeList);
}

// Load recipes from localStorage
function loadRecipes() {
  // get saved recipes from browser storage
  const savedRecipes = localStorage.getItem('recipes');
  
  // convert the string back to recipe list 
  if (savedRecipes) {
    recipeList = JSON.parse(savedRecipes);
    console.log('Recipes loaded from localStorage:', recipeList);
  } else {
    console.log('No saved recipes found in localStorage, using default recipes');
  }
}

// handle recipe submission 
function handleFormSubmit(event){
  event.preventDefault(); //prevent default submission

  // get form input values
  const nameInput = document.getElementById('recipeName');
  const ingredientsInput = document.getElementById('recipeIngredients');

  // extract cleaner string 
  const recipeName = nameInput.value.trim();
  const ingredientName = ingredientsInput.value.trim();

  // validate recipe name
  if(recipeName === '') {
    alert('Please enter a recipe name.');
    return false;
  }

  //process ingredient 
  const ingredients = ingredientName.split(',').map(ingredient => ingredient.trim()).filter(ingredient => ingredient !== '');
  
  // validate ingredients
  if(ingredients.length < 3){
    alert('Your Ingredients list should contain 3 or more comma seperated ingredients');
    return;
  }

  // create new recipe object
  const newRecipe = {
    name: recipeName,
    ingredients: ingredients
  }

  // add recipe to the list 
  recipeList.push(newRecipe);

  // save to local storage 
  saveRecipes();

  displayAllRecipes();

  //reset form and focus name field 
  event.target.reset();
  nameInput.focus();


}


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Load saved recipes and focus the name input
  loadRecipes();
  displayAllRecipes();

  const form = document.getElementById('saveRecipe');
  form.addEventListener('submit', handleFormSubmit());

  document.getElementById('recipeName').focus();
});


