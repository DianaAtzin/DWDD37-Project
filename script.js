// Variables to hold elements and data
let todoListElement = document.getElementById("todoList");
let newTodoInput = document.getElementById("newTodoInput");
let addTodoBtn = document.getElementById("addTodoBtn");
let updateTodoForm = document.getElementById("updateTodoForm");
let updateTodoName = document.getElementById("updateTodoName");
let updateTodoBtn = document.getElementById("updateTodoBtn");
let clearDoneBtn = document.getElementById("clearDoneBtn");
let taskCount = document.getElementById("taskCount");

// Predefined todos array
let todos = [
  {
    todoID: 0,
    todoText: "Buy groceries",
    todoComplete: false,
  },
  {
    todoID: 1,
    todoText: "Wash the dishes",
    todoComplete: true,
  },
  {
    todoID: 2,
    todoText: "Finish laundry",
    todoComplete: false,
  },
];

let currentlyEditing = null;

// Function to render todos
function renderTodos() {
  todoListElement.innerHTML = ""; // Clear existing todos

  todos.forEach((todo, index) => {
    let li = document.createElement("li");
    li.textContent = todo.todoText; // Access todoText property
    li.classList.toggle("done", todo.todoComplete); // Access todoComplete property

    // Add click event to toggle done status
    li.addEventListener("click", () => {
      todo.todoComplete = !todo.todoComplete; // Toggle done status
      renderTodos(); // Re-render todos to reflect changes
    });

    let actions = document.createElement("div");
    actions.classList.add("actions");

    let editBtn = document.createElement("span");
    editBtn.classList.add("editBtn");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent li click event from firing
      editTodo(index);
    });

    let deleteBtn = document.createElement("span");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent li click event from firing
      deleteTodo(index);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);
    todoListElement.appendChild(li);
  });
  taskCount.textContent = `You have ${todos.filter(todo => !todo.todoComplete).length} pending tasks.`;
}

// Function to add a new todo
function addTodo() {
  let title = newTodoInput.value.trim();
  if (title) {
    let newTodoID = todos.length ? Math.max(todos.map(todo => todo.todoID)) + 1 : 0; // Ensure unique todoID
    todos.push({ todoID: newTodoID, todoText: title, todoComplete: false });
    newTodoInput.value = "";
    renderTodos();
  }
}

// Function to edit a todo
function editTodo(index) {
  updateTodoName.value = todos[index].todoText;
  currentlyEditing = index;
  updateTodoForm.classList.remove("hidden");
}

// Function to update a todo
updateTodoBtn.addEventListener("click", () => {
  if (currentlyEditing !== null) {
    todos[currentlyEditing].todoText = updateTodoName.value.trim();
    updateTodoName.value = "";
    updateTodoForm.classList.add("hidden");
    currentlyEditing = null;
    renderTodos();
  }
});

// Function to delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Function to clear completed todos
clearDoneBtn.addEventListener("click", () => {
  todos = todos.filter(todo => !todo.todoComplete);
  renderTodos();
});

// Event listener for adding a todo by button click
addTodoBtn.addEventListener("click", addTodo);

// Event listener for adding a todo by pressing "Enter"
newTodoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

// Render todos on page load
renderTodos();
