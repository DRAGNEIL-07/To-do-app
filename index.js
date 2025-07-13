const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

const todos = [
  {
    id: 1,
    desc: "Write Python",
    dueDate: "2025-07-14T15:00:00",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    desc: "Write JavaScript",
    dueDate: "2025-07-15T09:00:00",
    priority: "medium",
    completed: true,
  },
];

app.get("/", (req, res) => {
  res.send("Todo List API Home Page");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id == req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

app.post("/todos", (req, res) => {
  const newTodo = { id: uuid.v4(), ...req.body };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((todo) => todo.id == req.params.id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).send("Todo not found");
  }
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id == req.params.id);
  if (todo) {
    Object.assign(todo, req.body);
    res.json(todo);
  } else {
    res.status(404).send("Todo with given id doesn't exist!");
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
