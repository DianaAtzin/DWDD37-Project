import { addTodo, clearCompletedTodos, fetchTodos } from './todos.js'; // Only import necessary functions from todos.js
import { addCategory, fetchCategories } from './categories.js';  // Import fetchCategories and addCategory from categories.js
import { renderTodos, renderCategories } from './ui.js';  // Import the render functions from ui.js

// DOM Elements
const addTodoBtn = document.getElementById("addTodoBtn");
const newTodoInput = document.getElementById("newTodoInput");
const clearDoneBtn = document.getElementById("clearDoneBtn");
const categorySelect = document.getElementById("categorySelect");
const newCategoryInput = document.getElementById("newCategoryInput");
const addCategoryBtn = document.getElementById("addCategoryBtn");

// Fetch and render todos from the backend
const fetchTodosAndRender = async () => {
    try {
        const todos = await fetchTodos();  // Get todos from backend API
        renderTodos(todos);  // Pass the todos to renderTodos to update UI
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
};

// Fetch and render categories from the backend
const fetchCategoriesAndRender = async () => {
    try {
        const categories = await fetchCategories();  // Get categories from backend API
        renderCategories(categories);  // Pass the categories to renderCategories to update UI
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

// Function to handle adding todos with category selection
const handleAddTodo = () => {
    const title = newTodoInput.value.trim();
    let selectedCategoryID = categorySelect.value; // Get the selected category ID from the dropdown

    // If no category is selected, assign the default category (e.g., "Household")
    if (!selectedCategoryID) {
        selectedCategoryID = 1;  // Assuming '1' is the ID of the default category (change to your default category ID)
    }

    if (title) {
        addTodo(title, selectedCategoryID);  // Send new todo to backend with the selected category ID
        newTodoInput.value = "";  // Clear input after adding todo
        fetchTodosAndRender();  // Re-fetch and render todos after adding
    } else {
        console.error('Todo title is missing');
        alert('Please enter a task and select a category.');
    }
};

// Event listener for adding a todo
addTodoBtn.addEventListener("click", handleAddTodo);

// Event listener for adding a todo by pressing "Enter"
newTodoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleAddTodo();  // Call the same function for adding a todo with category
    }
});

// Event listener for clearing completed todos
clearDoneBtn.addEventListener("click", async () => {
    try {
        await clearCompletedTodos();  // Send the request to delete completed todos from the backend
        fetchTodosAndRender();  // Re-fetch and render todos after clearing completed todos
    } catch (error) {
        console.error('Error clearing completed todos:', error);
    }
});

// Event listener for adding a new category
addCategoryBtn.addEventListener("click", async () => {
    const categoryName = newCategoryInput.value.trim();  // Get category name from input
    if (categoryName) {
        try {
            await addCategory(categoryName);  // Send the new category to the backend
            fetchCategoriesAndRender();  // Re-fetch and render categories after adding
            newCategoryInput.value = "";  // Clear input after adding category
        } catch (error) {
            console.error('Error adding category:', error);
        }
    } else {
        alert("Please enter a category name.");
    }
});

// Initial render of todos and categories
fetchTodosAndRender();
fetchCategoriesAndRender();


