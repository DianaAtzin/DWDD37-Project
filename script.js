
// Declare the todoList array to store all todos

// Initial todos array with sample data
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

// Select the todoList element
let todoList = document.querySelector(".todoList");
let inputField = document.querySelector(".inputField input");
let addButton = document.querySelector(".inputField button");
let clearCompletedBtn = document.querySelector(".footer button");


// Function to render the todos in the list
function renderTodos() {
  todoList.innerHTML = ""; // Clear the existing list items

  todos.forEach((todo) => {
    let li = document.createElement("li"); // Create a new list item element
    li.textContent = todo.todoText; // Set the text content to the todo text
    
    // Delete buttons
    let deleteBtn = document.createElement("span");  // Create a new span element
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';  // Add a delete icon to the span element
    deleteBtn.addEventListener("click", () => deleteTodo(todo.todoID));  // Add a click event listener to the delete button

    li.appendChild(deleteBtn); // Append the delete button to the list item
    
    
    //Mark the todo as completed
    // Apply "done" class if the todo is completed
    li.className = todo.todoComplete ? "done" : "";
    // Add a click event listener to toggle completion status
    li.addEventListener("click", () => {
      toggleTodoCompletion(todo.todoID); // Toggle the completion status
    });
    todoList.appendChild(li); // Append the list item to the todoList
  });

  // Update the pending tasks count
  updatePendingCount();
}



// Function to toggle completion status of a todo
function toggleTodoCompletion(id) {
  const todo = todos.find((todoItem) => todoItem.todoID === id); // Find the todo by ID
  if (todo) {
    todo.todoComplete = !todo.todoComplete; // Toggle the completion status
    console.log(
      `Todo ${todo.todoText} marked as ${todo.todoComplete ? "done" : "not done"}`
    );
    renderTodos(); // Re-render the todos to reflect changes
  }
}


// Function to update the pending tasks count
function updatePendingCount() {
  const pendingCount = todos.filter(todo => !todo.todoComplete).length;
  const footerText = document.querySelector(".footer span");
  footerText.textContent = `You have ${pendingCount} pending tasks.`;
}

// Function to add a new todo
function addTodo() {
  const todoText = inputField.value.trim();
  if (todoText === "") return; // Prevent adding empty todos
  const newTodo = {
    todoID: todos.length ? Math.max(...todos.map(todo => todo.todoID)) + 1 : 0,
    todoText,
    todoComplete: false,
  };
  todos.push(newTodo);
  inputField.value = ""; // Clear input field
  renderTodos(); // Re-render list
}

// Event listeners for adding todos
addButton.addEventListener("click", addTodo);
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});


// Function to delete a todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.todoID !== id);
  renderTodos(); // Re-render list
}


// Function to clear completed todos
function clearCompletedTodos() {
  todos = todos.filter((todo) => !todo.todoComplete); // Remove completed todos
  renderTodos(); // Re-render list
}


// Event listener for clearing completed todos
clearCompletedBtn.addEventListener("click", clearCompletedTodos);


// Initial render of todos
renderTodos();
