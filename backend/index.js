const express = require("express");
const config = require("./db.config");

const db = require("knex")({
  client: "mysql2",
  connection: {
    host: config.HOST,
    port: config.PORT,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
  },
});

db.schema.createTableIfNotExists("todos", (table) => {
  table.bigIncrements("id").primary()
  table.text("description").notNullable()
  table.text("name").notNullable()
  table.boolean("done").defaultTo(false)
}).then();  

const cors = require("cors");
const app = express();

const port = 4001
app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {
  db.select('*').from('todos').then((data) => {
    res.send(data)
  })
});

app.post("/todos", async (req, res) => {
  const { name, description } = req.body;

  db('todos').insert({name, description})
    .then(() => {
      res.send('Todo added successfully');
    })
    .catch((err) => {
      console.log(err);
      res.send('Unable to add todo');
    });
});

app.delete("/todos/:todoId", async (req, res) => {
  const todoId = req.params.todoId;

  db('todos').where({id: todoId}).del()
    .then(() => {
      res.send(`Todo ${todoId} deleted successfully`);
    })
    .catch((err) => {
      console.log(err);
      res.send('Unable to delete todo');
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
