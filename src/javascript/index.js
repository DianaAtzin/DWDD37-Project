
import { addTodo, clearCompletedTodos } from './todos.js';
import { renderTodos } from './ui.js';

// DOM Elements
const addTodoBtn = document.getElementById("addTodoBtn");
const newTodoInput = document.getElementById("newTodoInput");
const clearDoneBtn = document.getElementById("clearDoneBtn");

// Event listener for adding a todo
addTodoBtn.addEventListener("click", () => {
  let title = newTodoInput.value.trim();
  if (title) {
    addTodo(title);
    newTodoInput.value = "";
    renderTodos();
  }
});

// Event listener for adding a todo by pressing "Enter"
newTodoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    let title = newTodoInput.value.trim();
    if (title) {
      addTodo(title);
      newTodoInput.value = "";
      renderTodos();
    }
  }
});

// Event listener for clearing completed todos
clearDoneBtn.addEventListener("click", () => {
  clearCompletedTodos();
  renderTodos();
});

// Render todos on page load
renderTodos();
