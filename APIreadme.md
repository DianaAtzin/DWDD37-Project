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