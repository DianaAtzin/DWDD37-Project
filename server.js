const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello to Dianas Todo App!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//Start here 

let todos = [];
let categories = [];

app.get('/todos', (req, res) => {   
    res.json(todos);
}
);

