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
let categories = [
    { categoryID: 0, categoryName: 'Household' },
    { categoryID: 1, categoryName: 'Groceries' },
    { categoryID: 2, categoryName: 'Laundry' },
];

// API Endpoints

// GET TODOS
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// POST TODO
app.post('/api/todo', (req, res) => {
    const newTodo = {
        todoID: todos.length,  // Use length for unique ID
        todoText: req.body.todoText,
        todoComplete: req.body.todoComplete || false, // Default to false if not provided
        categoryID: req.body.categoryID,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT TODO (update)
app.put('/api/todo', (req, res) => {
    const todo = todos.find(t => t.todoID === parseInt(req.params.todoID));
    if (!todo) return res.status(404).send('Todo not found');

    // Update todo properties
    todo.todoText = req.body.todoText !== undefined ? req.body.todoText : todo.todoText;
    todo.todoComplete = req.body.todoComplete !== undefined ? req.body.todoComplete : todo.todoComplete;
    todo.categoryID = req.body.categoryID !== undefined ? req.body.categoryID : todo.categoryID;

    res.json(todo);
});

// DELETE TODO
app.delete('/api/todo', (req, res) => {
    todos = todos.filter(t => t.todoID !== parseInt(req.params.todoID));
    res.status(204).send(); // No content to send back
});

// GET ALL TODOS for a CATEGORY
app.get('/api/categories/categoryID/todos', (req, res) => {
    const categoryTodos = todos.filter(t => t.categoryID === parseInt(req.params.categoryID));
    res.json(categoryTodos);
});

// GET CATEGORIES
app.get('/api/categories', (req, res) => {
    res.json(categories);
});

// POST CATEGORIES
app.post('/api/categories', (req, res) => {
    const newCategory = {
        categoryID: categories.length,
        categoryName: req.body.categoryName,
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

// PUT CATEGORIES (update)
app.put('/api/categories/categoryID', (req, res) => {
    const category = categories.find(c => c.categoryID === parseInt(req.params.categoryID));
    if (!category) return res.status(404).send('Category not found');

    category.categoryName = req.body.categoryName || category.categoryName; // Update category name
    res.json(category);
});

// DELETE CATEGORIES
app.delete('/api/categories/categoryID', (req, res) => {
    categories = categories.filter(c => c.categoryID !== parseInt(req.params.categoryID));
    res.status(204).send(); // No content to send back
});
