// The base URL for TheMealDB API to fetch recipes
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const VEG_API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian';
const INGREDIENT_API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

// DOM elements
const searchForm = document.querySelector('.search-box');
const searchInput = document.querySelector('.search-box input');
const recipeSection = document.querySelector('.recipe-section');
const vegetarianBtn = document.querySelector('#vegetarianBtn'); // Button to fetch vegetarian recipes
const ingredientSearchForm = document.querySelector('.ingredient-search-box'); // Ingredient search form
const ingredientInput = document.querySelector('.ingredient-search-box input'); // Ingredient input field

// Fetch recipes from TheMealDB API based on the search term
async function fetchRecipes(query) {
    const response = await fetch(API_URL + query);
    const data = await response.json();

    if (data.meals) {
        renderRecipes(data.meals);
    } else {
        recipeSection.innerHTML = '<p>No recipes found for the given search term.</p>';
    }
}

// Fetch vegetarian recipes from TheMealDB API
async function fetchVegetarianRecipes() {
    const response = await fetch(VEG_API_URL);
    const data = await response.json();

    if (data.meals) {
        renderRecipes(data.meals);
    } else {
        recipeSection.innerHTML = '<p>No vegetarian recipes found.</p>';
    }
}

// Fetch recipes by ingredient
async function fetchRecipesByIngredient(ingredient) {
    const response = await fetch(INGREDIENT_API_URL + ingredient);
    const data = await response.json();

    if (data.meals) {
        renderRecipes(data.meals);
    } else {
        recipeSection.innerHTML = '<p>No recipes found with that ingredient.</p>';
    }
}

// Render recipe cards dynamically
function renderRecipes(recipes) {
    // Clear the recipe section before rendering new cards
    recipeSection.innerHTML = '';

    // Loop through each recipe and create a recipe card
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeImage = recipe.strMealThumb;
        const recipeTitle = recipe.strMeal;
        const recipeId = recipe.idMeal;

        // Recipe card HTML structure
        recipeCard.innerHTML = `
            <img src="${recipeImage}" alt="${recipeTitle}">
            <h2>${recipeTitle}</h2>
            <p>${recipe.strInstructions ? recipe.strInstructions.substring(0, 150) + '...' : 'No description available.'}</p>
            <a href="https://www.themealdb.com/meal.php?c=${recipeId}" target="_blank">View Recipe</a>
        `;

        // Append the recipe card to the recipe section
        recipeSection.appendChild(recipeCard);
    });
}

// Handle the search form submission
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    const query = searchInput.value.trim();

    if (query) {
        fetchRecipes(query); // Fetch recipes based on the search term
    } else {
        recipeSection.innerHTML = '<p>Please enter a recipe name to search.</p>';
    }
});

// Handle vegetarian button click
vegetarianBtn.addEventListener('click', () => {
    fetchVegetarianRecipes(); // Fetch vegetarian recipes
});

// Handle ingredient search form submission
ingredientSearchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    const ingredient = ingredientInput.value.trim();

    if (ingredient) {
        fetchRecipesByIngredient(ingredient); // Fetch recipes based on the ingredient
    } else {
        recipeSection.innerHTML = '<p>Please enter an ingredient to search for recipes.</p>';
    }
});

// Fetch some default recipes on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchRecipes(''); // Fetch all recipes or a default search term when the page loads
});



