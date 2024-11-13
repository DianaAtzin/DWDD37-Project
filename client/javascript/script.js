// Function to fetch all todos from the API
export const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/todos');
      if (!response.ok) throw new Error('Network response was not ok');
      const todos = await response.json();
      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
      return []; // Return an empty array if fetching fails
    }
  };
  

  
  // Function to edit a todo (set the todo for editing)
  export const editTodo = (todoID) => {
    currentlyEditing = todoID; // Set the current todo being edited using todoID
  };
  
  // Function to update a todo via the API
  export const updateTodo = async (todoID, newTitle, categoryID = null) => {
    if (currentlyEditing !== null) {
      const updatedTodo = { todoText: newTitle.trim(), categoryID };
      try {
        const response = await fetch(`http://localhost:3000/api/todo/${todoID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTodo),
        });
        const updatedData = await response.json();
        console.log('Todo updated:', updatedData);
        return updatedData; // Return updated todo
      } catch (error) {
        console.error('Error updating todo:', error);
      }
      currentlyEditing = null; // Reset the editing index after update
    }
  };
  
  // Function to delete a todo via the API
  export const deleteTodo = async (todoID) => {
    try {
      await fetch(`http://localhost:3000/api/todo/${todoID}`, {
        method: 'DELETE',
      });
      console.log('Todo deleted');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  
  // Function to clear completed todos via the API
  export const clearCompletedTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/todos');
      const todos = await response.json();
      const completedTodos = todos.filter(todo => todo.todoComplete);
      
      for (let todo of completedTodos) {
        await fetch(`http://localhost:3000/api/todo/${todo.todoID}`, {
          method: 'DELETE',
        });
      }
      console.log('Completed todos cleared');
    } catch (error) {
      console.error('Error clearing completed todos:', error);
    }
  };
  
  // Function to toggle the completion status of a todo via the API
  export const toggleTodoComplete = async (todoID) => {
    try {
      const todo = await fetchTodoByID(todoID);  // Fetch the specific todo by ID
      const updatedTodo = { todoComplete: !todo.todoComplete };
      const response = await fetch(`http://localhost:3000/api/todo/${todoID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      const updatedData = await response.json();
      console.log('Todo completion status updated:', updatedData);
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };
  
  // Helper function to fetch todo by ID for toggle action
  const fetchTodoByID = async (todoID) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todo/${todoID}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error fetching todo by ID:', error);
    }
  };
  