const express = require('express');
const app = express();
const PORT = 3000;

// Middleware for parsing request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'client' directory
app.use(express.static('client'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Root route
app.get('/', (req, res) => {
    res.send('Hello to Diana\'s Todo App!');
});

// In-memory data structures
let todos = [
    { todoID: 0, todoText: "Buy groceries", todoComplete: false, categoryID: 1 },
    { todoID: 1, todoText: "Wash the dishes", todoComplete: true, categoryID: 2 },
    { todoID: 2, todoText: "Finish laundry", todoComplete: false, categoryID: 2 },
];

let categories = [
    { categoryID: 0, categoryName: 'Household' },
    { categoryID: 1, categoryName: 'Groceries' },
    { categoryID: 2, categoryName: 'Laundry' },
];

// Helper functions to generate new IDs
function getNextTodoID() {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.todoID)) + 1 : 0;
}

function getNextCategoryID() {
    return categories.length > 0 ? Math.max(...categories.map(cat => cat.categoryID)) + 1 : 0;
}

// API Endpoints

// GET TODOS
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// POST TODOS
app.post('/api/todos', (req, res) => {
    const { todoText, categoryID } = req.body;
    const newTodo = {
        todoID: getNextTodoID(),
        todoText,
        todoComplete: false,
        categoryID: parseInt(categoryID),  // Ensure categoryID is stored as a number
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT TODO (update)
app.put('/api/todo/:todoID', (req, res) => {
    const todo = todos.find(t => t.todoID === parseInt(req.params.todoID));
    if (!todo) return res.status(404).send('Todo not found');

    todo.todoText = req.body.todoText || todo.todoText;
    todo.todoComplete = req.body.todoComplete !== undefined ? req.body.todoComplete : todo.todoComplete;
    todo.categoryID = req.body.categoryID !== undefined ? req.body.categoryID : todo.categoryID;

    res.json(todo);
});

// DELETE TODO
app.delete('/api/todo/:todoID', (req, res) => {
    todos = todos.filter(t => t.todoID !== parseInt(req.params.todoID));
    res.status(204).send(); // No content to send back
});

// GET ALL TODOS for a CATEGORY
app.get('/api/categories/:categoryID/todos', (req, res) => {
    const categoryTodos = todos.filter(t => t.categoryID === parseInt(req.params.categoryID));
    res.json(categoryTodos);
});

// GET CATEGORIES
app.get('/api/categories', (req, res) => {
    res.json(categories);
});

// POST CATEGORY
app.post('/api/categories', (req, res) => {
    const categoryName = req.body.categoryName;
    if (!categoryName) return res.status(400).send('Category name is required');

    const newCategory = {
        categoryID: getNextCategoryID(),
        categoryName,
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

// PUT CATEGORY (update)
app.put('/api/categories/:categoryID', (req, res) => {
    const category = categories.find(c => c.categoryID === parseInt(req.params.categoryID));
    if (!category) return res.status(404).send('Category not found');

    category.categoryName = req.body.categoryName || category.categoryName;

    res.json(category);
});

// DELETE CATEGORY
app.delete('/api/categories/:categoryID', (req, res) => {
    const categoryId = parseInt(req.params.categoryID);
    categories = categories.filter(c => c.categoryID !== categoryId);
    
    // Remove all todos related to the deleted category
    todos = todos.filter(todo => todo.categoryID !== categoryId);
    
    res.status(204).send(); // No content to send back
});

// Clear all completed todos
app.delete('/api/todos/clear-done', (req, res) => {
    todos = todos.filter(todo => !todo.todoComplete);
    res.status(204).send(); // No content to send back
});
