const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConfig");
const todoModel = require("./model/todoModel");
const app = express();

dbConnect();
app.use(cors());

// express middleware
app.use(express.json());

// defult route
app.get("/", (req, res) => {
  res.send("Welcome to our world");
});

// create todo
app.post("/createtask", async (req, res) => {
  let { task } = req.body;
  let createtodo = new todoModel({
    task: task,
  });
  await createtodo.save();
  res.status(201).send({ success: "todo created", data: createtodo });
});

// get all todo
app.get("/todos", async (req, res) => {
  let getalltodo = await todoModel.find({});
  res
    .status(200)
    .send({ success: "data fetch successfully", data: getalltodo });
});

// delet todo
app.delete("/deletetodo/:id", async (req, res) => {
  let { id } = req.params;
  let deletetodo = await todoModel.findOneAndDelete({ _id: id });
  res.status(200).send({ success: "todo deleted", data: deletetodo });
});

// update todo
app.patch("/updatetodo/:id", async (req, res) => {
  let { id } = req.params;
  let { task } = req.body;
  let updatetodo = await todoModel.findOneAndUpdate(
    { _id: id },
    { task: task },
    { new: true }
  );
  res
    .status(200)
    .send({ success: "Todo Updated successfull", date: updatetodo });
});

// singletodo
app.get("/singletodo/:id", async (req, res) => {
  let { id } = req.params;
  let singletodo = await todoModel.findOne({ _id: id });
  res
    .status(200)
    .send({ success: "singletodo fetch successfull", data: singletodo });
});

// start server
app.listen(3000, () => {
  console.log("server is running port number 3000");
});
