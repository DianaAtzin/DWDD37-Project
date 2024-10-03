// Initial predefined todos array
export let todos = [
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
  
    // Variable to store the index of the todo currently being edited
  
  export let currentlyEditing = null;
  
  // Function to add a new todo
  export function addTodo(title) {
    if (title) {
      let newTodoID = todos.length ? Math.max(...todos.map(todo => todo.todoID)) + 1 : 0; // Ensure unique todoID
      todos.push({ todoID: newTodoID, todoText: title, todoComplete: false });
    }
  }
  
  // Function to edit a todo
  export function editTodo(index) {
    currentlyEditing = index;
  }
  
  // Function to update a todo
  export function updateTodo(newTitle) {
    if (currentlyEditing !== null) {
      todos[currentlyEditing].todoText = newTitle.trim();
      currentlyEditing = null;
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
  