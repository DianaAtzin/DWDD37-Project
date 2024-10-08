import { todos, editTodo, deleteTodo, clearCompletedTodos, currentlyEditing, updateTodo } from './todos.js';
import { categories, addCategory, editCategory, deleteCategory } from './categories.js';

// DOM Elements
const todoListElement = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const updateTodoForm = document.getElementById("updateTodoForm");
const updateTodoName = document.getElementById("updateTodoName");
const updateTodoBtn = document.getElementById("updateTodoBtn");
const categorySelect = document.getElementById("categorySelect");
const updateTodoCategory = document.getElementById("updateTodoCategory");
const manageCategoriesBtn = document.getElementById("manageCategoriesBtn");
const categoryList = document.getElementById("categoryList");
const categoryManagement = document.getElementById("categoryManagement");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const newCategoryName = document.getElementById("newCategoryName");

// Function to render todos
export function renderTodos() {
    todoListElement.innerHTML = ""; // Clear existing todos

    todos.forEach((todo, index) => {
        let li = document.createElement("li");
        li.textContent = `${todo.todoText} - ${getCategoryNameByID(todo.categoryID)}`; // Show category with todo

        li.classList.toggle("done", todo.todoComplete); // Access todoComplete property

        // Add click event to toggle done status
        li.addEventListener("click", () => {
            todo.todoComplete = !todo.todoComplete;
            renderTodos(); // Re-render todos to reflect changes
        });

        // Action buttons (edit, delete)
        let actions = document.createElement("div");
        actions.classList.add("actions");

        let editBtn = document.createElement("button");
        editBtn.classList.add("editBtn");
        editBtn.innerHTML = '<i class="fas fa-edit"></i>'; // Font Awesome icon for edit
        editBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            editTodoUI(index);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome icon for delete
        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            deleteTodoUI(index);
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(actions);
        todoListElement.appendChild(li);
    });

    taskCount.textContent = `You have ${todos.filter(todo => !todo.todoComplete).length} pending tasks.`;
}

// Function to render categories in both the add and edit forms
export function renderCategories() {
    // Clear existing options
    categorySelect.innerHTML = '<option value="">Select Category</option>'; 
    updateTodoCategory.innerHTML = '<option value="">Select Category</option>'; 

    // Populate categories dynamically
    categories.forEach(category => {
        let option = document.createElement("option");
        option.value = category.categoryID;
        option.textContent = category.categoryName;
        categorySelect.appendChild(option);

        // Create a similar option for the update form
        let editOption = option.cloneNode(true); // Clone the option
        updateTodoCategory.appendChild(editOption); // Add to the update dropdown
    });
}

// Helper function to get category name by ID
function getCategoryNameByID(categoryID) {
    const category = categories.find(cat => cat.categoryID == categoryID);
    return category ? category.categoryName : 'Uncategorized';
}

// UI Functions for editing
function editTodoUI(index) {
    updateTodoName.value = todos[index].todoText;
    updateTodoCategory.value = todos[index].categoryID || ""; // Set the current category in the dropdown
    editTodo(index);
    updateTodoForm.classList.remove("hidden");
}

function deleteTodoUI(index) {
    deleteTodo(index);
    renderTodos();
}

// Event listener for updating a todo
updateTodoBtn.addEventListener("click", () => {
    if (currentlyEditing !== null) {
        const newTitle = updateTodoName.value.trim();
        const selectedCategoryID = updateTodoCategory.value; // Get the selected category ID
        // Use the updateTodo function to update both todo text and category
        updateTodo(newTitle, selectedCategoryID); // Pass both parameters
        updateTodoName.value = ""; // Clear the input field
        updateTodoCategory.value = ""; // Clear the category select
        updateTodoForm.classList.add("hidden");
        renderTodos(); // Re-render todos to reflect changes
    }
});

// --- Category Management Section ---

// Show/Hide category management
manageCategoriesBtn.addEventListener("click", () => {
    categoryManagement.classList.toggle("hidden");
    renderCategoryManagement();
});

// Function to render categories with edit and delete options
function renderCategoryManagement() {
    categoryList.innerHTML = ""; // Clear existing list

    categories.forEach((category, index) => {
        let li = document.createElement("li");

        // Display category name
        let categoryName = document.createElement("span");
        categoryName.textContent = category.categoryName;
        categoryName.classList.add("category-name");

        // Input field for editing category
        let editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = category.categoryName;
        editInput.classList.add("editInput", "hidden"); // Hidden by default

        // Edit button (icon only)
        let editBtn = document.createElement("button");
        editBtn.classList.add("editBtn");
        editBtn.innerHTML = '<i class="fas fa-edit"></i>'; // Font Awesome edit icon
        editBtn.addEventListener("click", () => {
            // Toggle visibility of input field
            const isHidden = editInput.classList.toggle("hidden");
            if (!isHidden) {
                editInput.focus(); // Focus on input when it becomes visible
            } else {
                // If hidden, update the category
                const newName = editInput.value.trim();
                if (newName) {
                    editCategory(index, newName); // Update the category name
                    renderCategoryManagement(); // Re-render the categories
                    renderCategories(); // Update the select options
                    renderTodos(); // Re-render the todos with updated category names
                }
            }
        });

        // Delete button (icon only)
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome trash icon
        deleteBtn.addEventListener("click", () => {
            deleteCategory(index); // Delete the category immediately
            renderCategoryManagement(); // Re-render the categories
            renderCategories(); // Update the select options
            renderTodos(); // Re-render the todos to reflect the deleted category
        });

        // Append input, buttons, and name to the list item
        li.appendChild(categoryName);
        li.appendChild(editInput);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        categoryList.appendChild(li);
    });
}

// Event listener for adding a new category
addCategoryBtn.addEventListener("click", () => {
    const categoryName = newCategoryName.value.trim(); // Ensure we use the correct input field ID
    if (categoryName) {
        addCategory(categoryName); // Add new category
        newCategoryName.value = ""; // Clear the input field
        renderCategoryManagement(); // Immediately render updated categories
        renderCategories(); // Update the select options
    }
});

// Initial rendering of categories on page load
renderCategories();
// Initial rendering of todos on page load
renderTodos();
