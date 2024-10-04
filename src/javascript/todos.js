// Initial predefined todos array
export let todos = [
    {
      todoID: 0,
      todoText: "Buy groceries",
      todoComplete: false,
      categoryID: 1, 
    },
    {
      todoID: 1,
      todoText: "Wash the dishes",
      todoComplete: true,
      categoryID: 2,
    },
    {
      todoID: 2,
      todoText: "Finish laundry",
      todoComplete: false,
      categoryID: 2, 
    },
];
  
// Variable to store the index of the todo currently being edited
export let currentlyEditing = null;
  
// Function to add a new todo
export function addTodo(title, categoryID = null) {
    if (title) {
        const newTodoID = todos.length ? Math.max(...todos.map(todo => todo.todoID)) + 1 : 0;
        todos.push({ todoID: newTodoID, todoText: title, todoComplete: false, categoryID }); 
    }
}
  
// Function to edit a todo
export function editTodo(index) {
    currentlyEditing = index;
}
  
// Function to update a todo
export function updateTodo(newTitle, categoryID = null) {
    if (currentlyEditing !== null) {
        todos[currentlyEditing].todoText = newTitle.trim();
        if (categoryID !== null) {
            todos[currentlyEditing].categoryID = categoryID; // Update the category ID
        }
        currentlyEditing = null; // Reset the editing index
    }
}
  
// Function to delete a todo
export function deleteTodo(index) {
    todos.splice(index, 1);
}
  
// Function to clear completed todos
export function clearCompletedTodos() {
    todos = todos.filter(todo => !todo.todoComplete);
}
  
// Function to toggle the completion status of a todo
export function toggleTodoComplete(index) {
    todos[index].todoComplete = !todos[index].todoComplete;
}
