 


/* // Variables to represent todo data
const todoId = 1; // Number type for todo ID
const todoTitle = "Buy groceries"; // String type for todo title
const todoDescription = "Milk, eggs, bread"; // String type for todo description
const todoDueDate = new Date("2024-9-5"); // Date type for todo due date
const todoPriority = "High"; // String type for todo priority
const todoCompleted = false; // Boolean type for todo completion status
const todoCategory = "Grocery"; // String type for todo category

// Data model for todo
const todo = {
    id: todoId,
    title: todoTitle,
    description: todoDescription,
    dueDate: todoDueDate,
    priority: todoPriority,
    completed: todoCompleted,
    category: todoCategory
};

// Add the first todo item to the todoList
todoList.push(todo);

// Function to add a new todo
function addTodo(newTodo) {
    // Add the new todo to the data model
    todoList.push(newTodo);
}

// Usage example
const newTodo = {
    id: 2,
    title: "Clean the house",
    description: "Vacuum, dust, and mop",
    dueDate: new Date("2024-9-10"),
    priority: "Medium",
    completed: false,
    category: "Household"
};

// Add new todo to the todoList
addTodo(newTodo);

// Check the current todos in the list
console.log(todoList); // Output: [ { id: 1, title: 'Buy groceries', description: 'Milk, eggs, bread', dueDate: 2024-09-05T00:00:00.000Z, priority: 'High', completed: false, category: 'Grocery' }, { id: 2, title: 'Clean the house', description: 'Vacuum, dust, and mop', dueDate: 2024-09-10T00:00:00.000Z, priority: 'Medium', completed: false, category: 'Household' } ]

// Function to mark a todo as complete
function completeTodo(todoId) {
    const todo = todoList.find(item => item.id === todoId);
    if (todo) {
        todo.completed = true;
        console.log(`Todo with ID ${todoId} is marked as complete.`);
    } else {
        console.log(`Todo with ID ${todoId} not found.`);
    }
}

completeTodo(2); // Output: Todo with ID 2 is marked as complete.
*/

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

// Function to render the todos in the list
function renderTodos() {
  todoList.innerHTML = ""; // Clear the existing list items

  todos.forEach((todo) => {
    let li = document.createElement("li"); // Create a new list item element
    li.textContent = todo.todoText; // Set the text content to the todo text

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

// Initial render of todos
renderTodos();
