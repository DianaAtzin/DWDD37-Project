# Todo App API Documentation

## Base URL
http://localhost:3000


## Endpoints

### 1. GET /api/todos
- **Description**: Retrieves all todos.
- **Method**: GET
- **Response**:
  ```json
  [
    {
      "todoID": 0,
      "todoText": "Buy groceries",
      "todoComplete": false,
      "categoryID": 1
    },
    {
      "todoID": 1,
      "todoText": "Wash the dishes",
      "todoComplete": true,
      "categoryID": 2
    }
  ]


### 2. POST /api/todos
- **Description**: Creates a new todo.
- **Method**: POST
- **Response Body**:

  {
  "todoText": "New Todo",
  "categoryID": 1
 }

- **Response**:
{
  "todoID": 3,
  "todoText": "New Todo",
  "todoComplete": false,
  "categoryID": 1
}
- **Status**:
201 Created: When a new todo is created.
400 Bad Request: If required fields are missing


### 3. PUT /api/todo/
- **Description**: Updates an existing todo by ID.
- **Method**: PUT
- **Response Body**:
{
  "todoText": "Updated Todo",
  "todoComplete": true,
  "categoryID": 2
}
- **Response**:
{
  "todoID": 1,
  "todoText": "Updated Todo",
  "todoComplete": true,
  "categoryID": 2
}
- **Status**:
200 OK: When the todo is successfully updated.
404 Not Found: If the todo ID does not exist.


### 4. DELETE /api/todo/
- **Description**: Deletes a todo by ID.
- **Method**: DELETE
- **Response**:
    **Status**
    204 No Content


### 5.GET /api/categories/todos

- **Description**: Retrieves all todos for a specific category.
- **Method**: GET
- **Response Body**:
[
  {
    "todoID": 1,
    "todoText": "Wash the dishes",
    "todoComplete": true,
    "categoryID": 2
  }
]

### 6. GET /api/categories

- **Description**: Retrieves all categories.
- **Method**: GET
- **Response Body**:
[
  {
    "categoryID": 1,
    "categoryName": "Groceries"
  },
  {
    "categoryID": 2,
    "categoryName": "Laundry"
  }
]

### 7. POST /api/categories
- **Description**: Creates a new category.
- **Method**: POST
- **Response Body**:
{
  "categoryName": "New Category"
}

- **Response**:
{
  "categoryID": 3,
  "categoryName": "New Category"
}

- **Status**:
201 Created: When a new category is created.

### 8. PUT /api/categories/
- **Description**: Updates an existing category by ID.
- **Method**: PUT
- **Response Body**:
{
  "categoryName": "Updated Category"
}

- **Response**:
{
  "categoryID": 2,
  "categoryName": "Updated Category"
}

- **Status**:
200 OK: When the category is successfully updated.
404 Not Found: If the category ID does not exist.

### 9. DELETE /api/categories/
- **Description**: Deletes a category by ID.
- **Method**: DELETE
- **Response Body**:
204 No Content