// DOM Elements
const newTodoInput = document.getElementById('newTodoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const categorySelect = document.getElementById('categorySelect');
const newCategoryName = document.getElementById('newCategoryName');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const manageCategoriesBtn = document.getElementById('manageCategoriesBtn');
const categoryManagement = document.getElementById('categoryManagement');
const categoryList = document.getElementById('categoryList');
const todoList = document.getElementById('todoList');
const updateTodoForm = document.getElementById('updateTodoForm');
const updateTodoName = document.getElementById('updateTodoName');
const updateTodoCategory = document.getElementById('updateTodoCategory');
const updateTodoBtn = document.getElementById('updateTodoBtn');
const clearDoneBtn = document.getElementById('clearDoneBtn');
const taskCount = document.getElementById('taskCount');

// API Functions
async function fetchTodos() {
    try {
        const response = await fetch('/api/todos');
        return await response.json();
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

async function fetchCategories() {
    try {
        const response = await fetch('/api/categories');
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function addCategory(categoryName) {
    try {
        await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryName }),
        });
        fetchAndRenderCategories();
    } catch (error) {
        console.error('Error adding category:', error);
    }
}

async function addTodo(todoText, categoryId) {
    try {
        await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todoText, categoryID: categoryId }),
        });
        fetchAndRenderTodos();
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

async function deleteCategory(categoryID) {
    try {
        await fetch(`/api/categories/${categoryID}`, { method: 'DELETE' });
        fetchAndRenderCategories();
    } catch (error) {
        console.error('Error deleting category:', error);
    }
}

async function updateCategory(categoryID, newCategoryName) {
    try {
        await fetch(`/api/categories/${categoryID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryName: newCategoryName }),
        });
        fetchAndRenderCategories();
    } catch (error) {
        console.error('Error updating category:', error);
    }
}

async function toggleTodoComplete(todoID) {
    try {
        const todos = await fetchTodos();
        const todo = todos.find(t => t.todoID === todoID);
        
        const updatedTodo = { ...todo, todoComplete: !todo.todoComplete };

        await fetch(`/api/todo/${todoID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todoComplete: updatedTodo.todoComplete }),
        });

        fetchAndRenderTodos();
    } catch (error) {
        console.error('Error toggling todo completion:', error);
    }
}

async function startEditingTodo(todo, categories) {
    const todoItem = document.querySelector(`#todoList li[data-id="${todo.todoID}"]`);

    if (todoItem) {
        todoItem.classList.add('editing'); // Mark the todo as being edited

        todoItem.innerHTML = '';

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = todo.todoText;
        editInput.classList.add('editInput');
        todoItem.appendChild(editInput);

        const categorySelect = document.createElement('select');
        categorySelect.classList.add('editCategorySelect');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.categoryID;
            option.textContent = category.categoryName;
            if (category.categoryID === todo.categoryID) {
                option.selected = true;
            }
            categorySelect.appendChild(option);
        });
        todoItem.appendChild(categorySelect);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('saveBtn');
        saveButton.addEventListener('click', async (event) => {
            event.stopPropagation(); // Prevent marking as done on save click
            await saveTodoChanges(todo.todoID, editInput.value, categorySelect.value);
            todoItem.classList.remove('editing'); // Remove editing mode after save
        });
        todoItem.appendChild(saveButton);
    }
}

async function saveTodoChanges(todoID, newText, newCategoryID) {
    try {
        await fetch(`/api/todo/${todoID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todoText: newText,
                categoryID: parseInt(newCategoryID),
            }),
        });
        fetchAndRenderTodos(); 
    } catch (error) {
        console.error('Error saving todo changes:', error);
    }
}

async function deleteTodo(todoID) {
    try {
        await fetch(`/api/todo/${todoID}`, { method: 'DELETE' });
        fetchAndRenderTodos();
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

// Rendering Functions
function renderTodos(todos, categories) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.setAttribute('data-id', todo.todoID);

        if (todo.todoComplete) {
            todoItem.classList.add('done');
        }

        const category = categories.find(cat => cat.categoryID === todo.categoryID);
        const categoryName = category ? category.categoryName : 'Uncategorized';

        todoItem.textContent = `${todo.todoText} (${categoryName})`;

        todoItem.addEventListener('click', (event) => {
            // Ensure marking as done doesn't happen when editing
            if (!event.target.closest('.editBtn, .deleteBtn') && !todoItem.classList.contains('editing')) {
                toggleTodoComplete(todo.todoID);
            }
        });

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        editButton.classList.add('editBtn');
        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
            startEditingTodo(todo, categories);
        });
        todoItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('deleteBtn');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteTodo(todo.todoID);
        });
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    });
    taskCount.textContent = `You have ${todos.filter(todo => !todo.todoComplete).length} pending tasks.`;
}

// Category Editing Function
async function startEditingCategory(category) {
    const categoryItem = document.querySelector(`#categoryList li[data-id="${category.categoryID}"]`);
    
    if (categoryItem) {
        const currentName = categoryItem.querySelector('.category-name');
        const actionsContainer = categoryItem.querySelector('.actions');
        
        // Hide the current name and actions while editing
        currentName.style.display = 'none';
        actionsContainer.style.display = 'none';

        // Create input field to edit the category name
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = category.categoryName || '';
        editInput.classList.add('editInput');
        categoryItem.appendChild(editInput);
        
        editInput.focus();

        const saveChanges = async () => {
            const newCategoryName = editInput.value.trim();
            
            if (newCategoryName && newCategoryName !== category.categoryName) {
                // Save the new category name
                await updateCategory(category.categoryID, newCategoryName);
                currentName.textContent = newCategoryName;
            }

            // Remove the input field and restore the original layout
            editInput.remove();
            currentName.style.display = 'inline';
            actionsContainer.style.display = 'flex';
        };

        editInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                await saveChanges();
            }
        });

        editInput.addEventListener('blur', async () => {
            await saveChanges();
        });
    }
}

function renderCategories(categories) {
    categoryList.innerHTML = '';
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.setAttribute('data-id', category.categoryID);

        const categoryName = document.createElement('span');
        categoryName.classList.add('category-name');
        categoryName.textContent = category.categoryName;
        categoryItem.appendChild(categoryName);

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        editButton.classList.add('editBtn');
        editButton.addEventListener('click', () => {
            startEditingCategory(category); // Now works because startEditingCategory is defined
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('deleteBtn');
        deleteButton.addEventListener('click', () => {
            deleteCategory(category.categoryID);
        });

        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('actions');
        actionsContainer.appendChild(editButton);
        actionsContainer.appendChild(deleteButton);

        categoryItem.appendChild(actionsContainer);
        categoryList.appendChild(categoryItem);

        const option = document.createElement('option');
        option.value = category.categoryID;
        option.textContent = category.categoryName;
        categorySelect.appendChild(option);
    });
}

// Initial Fetch and Render
async function fetchAndRenderTodos() {
    const todos = await fetchTodos();
    const categories = await fetchCategories();
    renderTodos(todos, categories);
}

async function fetchAndRenderCategories() {
    const categories = await fetchCategories();
    renderCategories(categories);
}

// Event Listeners
addTodoBtn.addEventListener('click', async () => {
    const todoText = newTodoInput.value.trim();
    const categoryId = categorySelect.value;

    if (todoText) {
        await addTodo(todoText, categoryId);
        newTodoInput.value = '';
    } else {
        alert('Please enter a todo.');
    }
    fetchAndRenderTodos();
});

addCategoryBtn.addEventListener('click', async () => {
    const categoryName = newCategoryName.value.trim();
    if (categoryName) {
        await addCategory(categoryName);
        newCategoryName.value = '';
    } else {
        alert('Please enter a category name.');
    }
    fetchAndRenderCategories();
});

clearDoneBtn.addEventListener('click', async () => {
    try {
        await fetch('/api/todos/clear-done', { method: 'DELETE' });
        fetchAndRenderTodos();
    } catch (error) {
        console.error('Error clearing completed todos:', error);
    }
});

manageCategoriesBtn.addEventListener('click', () => {
    categoryManagement.classList.toggle('hidden');
    if (!categoryManagement.classList.contains('hidden')) {
        fetchAndRenderCategories();
    }
});

// Initial Render
fetchAndRenderTodos();
fetchAndRenderCategories();
