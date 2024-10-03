// ui.js
import { todos, editTodo, deleteTodo, clearCompletedTodos } from './todos.js';

// DOM Elements
const todoListElement = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const updateTodoForm = document.getElementById("updateTodoForm");
const updateTodoName = document.getElementById("updateTodoName");
const updateTodoBtn = document.getElementById("updateTodoBtn");

// Function to render todos
export function renderTodos() {
  todoListElement.innerHTML = ""; // Clear existing todos

  todos.forEach((todo, index) => {
    let li = document.createElement("li");
    li.textContent = todo.todoText;
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

// UI Functions for editing and deleting
function editTodoUI(index) {
  updateTodoName.value = todos[index].todoText;
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
      todos[currentlyEditing].todoText = updateTodoName.value.trim();
      updateTodoName.value = "";
      updateTodoForm.classList.add("hidden");
      currentlyEditing = null;
      renderTodos();
    }
  });