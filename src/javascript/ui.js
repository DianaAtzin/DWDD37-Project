import { todos, editTodo, deleteTodo, clearCompletedTodos, currentlyEditing, updateTodo } from './todos.js';
import { categories } from './categories.js'; // Import categories array

// DOM Elements
const todoListElement = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const updateTodoForm = document.getElementById("updateTodoForm");
const updateTodoName = document.getElementById("updateTodoName");
const updateTodoBtn = document.getElementById("updateTodoBtn");
const categorySelect = document.getElementById("categorySelect");
const updateTodoCategory = document.getElementById("updateTodoCategory");

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

    let editBtn = document.createElement("span");
    editBtn.classList.add("editBtn");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      editTodoUI(index);
    });

    let deleteBtn = document.createElement("span");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
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
  const category = categories.find(cat => cat.categoryID === categoryID);
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
      // Use the updateTodo function to update both todo text and category
      updateTodo(updateTodoName.value.trim(), updateTodoCategory.value); // Pass both parameters
      updateTodoName.value = ""; // Clear the input field
      updateTodoCategory.value = ""; // Clear the category select
      updateTodoForm.classList.add("hidden");
      renderTodos();
    }
});

// Initial rendering of categories on page load
renderCategories();
// Initial rendering of todos on page load
renderTodos();
