import { fetchTodos, addTodo, editTodo, deleteTodo, updateTodo, todos } from './todos.js';
import { fetchCategories, addCategory, editCategory, deleteCategory, categories } from './categories.js';

// DOM Elements
const todoListElement = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const updateTodoForm = document.getElementById("updateTodoForm");
const updateTodoName = document.getElementById("updateTodoName");
const updateTodoBtn = document.getElementById("updateTodoBtn");
const categorySelect = document.getElementById("categorySelect");
const updateTodoCategory = document.getElementById("updateTodoCategory");
const manageCategoriesBtn = document.getElementById("manageCategoriesBtn");
const categoryList = document.getElementById("categoryList");
const categoryManagement = document.getElementById("categoryManagement");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const newCategoryName = document.getElementById("newCategoryName");

// Fetch and render todos
const fetchTodosAndRender = async () => {
    try {
        const todos = await fetchTodos();
        renderTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
};

// Fetch and render categories
const fetchCategoriesAndRender = async () => {
    try {
        const categories = await fetchCategories();
        renderCategories(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

// Function to render todos
export function renderTodos(todos) {
    const todoListElement = document.getElementById("todoList");
    todoListElement.innerHTML = ""; // Clear existing todos

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = `${todo.todoText} - ${getCategoryNameByID(todo.categoryID)}`;
        li.classList.toggle("done", todo.todoComplete);

        // Click event to toggle done status
        li.addEventListener("click", () => {
            todo.todoComplete = !todo.todoComplete;
            updateTodo(todo.todoID, todo.todoText, todo.todoComplete, todo.categoryID); // Update todo
            renderTodos(todos);  // Re-render todos after completion status changes
        });

        const actions = document.createElement("div");
        actions.classList.add("actions");

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.classList.add("editBtn");
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            editTodoUI(todo);
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            deleteTodoUI(todo);
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(actions);
        todoListElement.appendChild(li);
    });

    taskCount.textContent = `You have ${todos.filter(todo => !todo.todoComplete).length} pending tasks.`;
}

// Function to render categories in both the add and edit forms
export function renderCategories(categories) {
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    updateTodoCategory.innerHTML = '<option value="">Select Category</option>';

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.categoryID;
        option.textContent = category.categoryName;
        categorySelect.appendChild(option);

        const editOption = option.cloneNode(true);
        updateTodoCategory.appendChild(editOption);
    });
}

// Helper function to get category name by ID
function getCategoryNameByID(categoryID) {
    const category = categories.find(cat => cat.categoryID === categoryID);
    return category ? category.categoryName : 'No Category';
}

// Edit todo UI
function editTodoUI(todo) {
    updateTodoName.value = todo.todoText;
    updateTodoCategory.value = todo.categoryID || "";
    updateTodoForm.style.display = "flex";
}

// Delete todo UI
function deleteTodoUI(todo) {
    deleteTodo(todo.todoID);
    renderTodos(todos);  // Re-render after deleting
}

// Event listener for updating a todo
updateTodoBtn.addEventListener("click", () => {
    const newTitle = updateTodoName.value.trim();
    const selectedCategoryID = updateTodoCategory.value;
    const todoID = todos.find(todo => todo.todoText === newTitle).todoID;  // Find matching todoID
    updateTodo(todoID, newTitle, false, selectedCategoryID);  // Update todo with new title and category
    updateTodoName.value = "";
    updateTodoCategory.value = "";
    updateTodoForm.style.display = "none";
    renderTodos(todos);  // Re-render todos to reflect changes
});

// Manage Categories UI
manageCategoriesBtn.addEventListener("click", () => {
    categoryManagement.classList.toggle("hidden");
    renderCategoryManagement();
});

// Render categories for management
function renderCategoryManagement() {
    categoryList.innerHTML = "";

    categories.forEach(category => {
        const li = document.createElement("li");

        const categoryName = document.createElement("span");
        categoryName.textContent = category.categoryName;
        categoryName.classList.add("category-name");

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = category.categoryName;
        editInput.classList.add("editInput", "hidden");

        const editBtn = document.createElement("button");
        editBtn.classList.add("editBtn");
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.addEventListener("click", () => {
            li.classList.toggle('editing');
            if (li.classList.contains('editing')) {
                editInput.classList.remove("hidden");
                editInput.focus();
            } else {
                editInput.classList.add("hidden");
                const newName = editInput.value.trim();
                if (newName) {
                    editCategory(category.categoryID, newName);
                    renderCategoryManagement();
                    renderCategories(categories);
                    renderTodos(todos);
                }
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener("click", () => {
            deleteCategory(category.categoryID);
            renderCategoryManagement();
            renderCategories(categories);
            renderTodos(todos);
        });

        li.appendChild(categoryName);
        li.appendChild(editInput);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        categoryList.appendChild(li);
    });
}

// Event listener for adding a new category
addCategoryBtn.addEventListener("click", async () => {
    const categoryName = newCategoryName.value.trim();
    if (categoryName) {
        try {
            await addCategory(categoryName);
            fetchCategoriesAndRender();
            renderTodos(todos);
            renderCategories(categories);
            newCategoryName.value = "";
        } catch (error) {
            console.error('Error adding category:', error);
        }
    }
});

// Initial rendering
fetchCategoriesAndRender();
fetchTodosAndRender();
