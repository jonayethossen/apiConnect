const express = require("express");
const dbConnect = require("./config/dbConfig");
const todoModel = require("./model/todoModel");
const app = express();
dbConnect();
app.use(express.json());
app.post("/createtask", async (req, res) => {
  let { task } = req.body;
  let createtodo = new todoModel({
    task: task,
  });
  await createtodo.save();
  res.status(201).send({ success: "todo created", data: createtodo });
});

app.listen(3000, () => {
  console.log("server is running port number 3000");
});
