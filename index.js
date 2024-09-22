import "./styles.css";

// Declare the todoList array to store all todos
let todoList = [];

// Variables to represent todo data
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

