import { addTodo, clearCompletedTodos } from './todos.js';
import { addCategory } from './categories.js';
import { renderTodos, renderCategories } from './ui.js';

// DOM Elements
const addTodoBtn = document.getElementById("addTodoBtn");
const newTodoInput = document.getElementById("newTodoInput");
const clearDoneBtn = document.getElementById("clearDoneBtn");
const categorySelect = document.getElementById("categorySelect");
const newCategoryInput = document.getElementById("newCategoryInput");
const addCategoryBtn = document.getElementById("addCategoryBtn");

// Function to handle adding todos with category selection
const handleAddTodo = () => {
    const title = newTodoInput.value.trim();
    const selectedCategoryID = categorySelect.value; // Get the selected category ID from the dropdown

    if (title) {
      addTodo(title, selectedCategoryID);  // Pass both title and selected category ID to addTodo
      newTodoInput.value = "";  // Clear input after adding todo
      renderTodos();  // Re-render todos after adding
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
clearDoneBtn.addEventListener("click", () => {
    clearCompletedTodos();
    renderTodos();  // Re-render after clearing completed todos
});

// Event listener for adding a new category
addCategoryBtn.addEventListener("click", () => {
    const categoryName = newCategoryInput.value.trim();  // Get category name from input
    if (categoryName) {
        addCategory(categoryName);  // Add the category
        renderCategories();  // Re-render categories after adding
        newCategoryInput.value = "";  // Clear input after adding category
    } else {
        alert("Please enter a category name.");
    }
});

// Render todos and categories on page load
renderTodos();
renderCategories();

