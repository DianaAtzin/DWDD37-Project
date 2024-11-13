// In-memory data for todos (this will be replaced with data from the backend)
export let todos = [];

// Variable to store the index of the todo currently being edited
export let currentlyEditing = null;

// Fetch todos from the backend API
export const fetchTodos = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/todos');
        if (!response.ok) throw new Error('Network response was not ok');
        todos = await response.json();  // Update the in-memory todos array
        return todos;
    } catch (error) {
        console.error('Error fetching todos:', error);
        return [];  // Return an empty array if fetching fails
    }
};

// Function to add a new todo via the API
export const addTodo = async (title, categoryID = null) => {
    if (title && categoryID !== null) {
        const newTodo = { todoText: title, categoryID };
        try {
            const response = await fetch('http://localhost:3000/api/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });
            const addedTodo = await response.json();
            console.log('New Todo added:', addedTodo);
            return addedTodo;
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    } else {
        console.error('Todo title or category ID is missing');
    }
};

// Function to edit a todo (used for UI)
export const editTodo = (todoID) => {
    currentlyEditing = todoID;  // Set the current todo being edited using todoID
};

// Function to update a todo via the backend API
export const updateTodo = async (newTitle, categoryID = null) => {
    if (currentlyEditing !== null) {
        const todo = todos.find(t => t.todoID === currentlyEditing);
        if (todo) {
            const updatedTodo = { todoText: newTitle.trim(), categoryID: categoryID || todo.categoryID };
            try {
                const response = await fetch(`http://localhost:3000/api/todo/${todo.todoID}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedTodo),
                });
                const updatedData = await response.json();
                currentlyEditing = null; // Reset editing mode
                return updatedData;  // Return the updated todo
            } catch (error) {
                console.error('Error updating todo:', error);
            }
        }
    }
};

// Function to delete a todo via the backend API
export const deleteTodo = async (todoID) => {
    try {
        await fetch(`http://localhost:3000/api/todo/${todoID}`, {
            method: 'DELETE',
        });
        console.log(`Todo with ID: ${todoID} deleted.`);
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
};

// Function to clear all completed todos via the backend API
export const clearCompletedTodos = async () => {
    try {
        await fetch('http://localhost:3000/api/todo/status', { method: 'DELETE' }); // Clear completed todos from backend
        console.log('Completed todos cleared');
    } catch (error) {
        console.error('Error clearing completed todos:', error);
    }
};

// Function to toggle the completion status of a todo via the backend API
export const toggleTodoComplete = async (todoID) => {
    try {
        const todo = todos.find(t => t.todoID === todoID);
        if (todo) {
            const updatedTodo = { todoComplete: !todo.todoComplete };
            const response = await fetch(`http://localhost:3000/api/todo/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: todo.todoID }),
            });
            const updatedData = await response.json();
            console.log(`Todo "${todo.todoText}" marked as ${updatedData.todoComplete ? 'complete' : 'incomplete'}.`);
        }
    } catch (error) {
        console.error('Error toggling todo completion:', error);
    }
};
