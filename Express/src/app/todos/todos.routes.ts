import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { client } from "../../config/mongodb";
import { ObjectId } from "mongodb";
export const todoRouter = express.Router();

const filePath = path.join(__dirname, "../../../db/todo.json");

todoRouter.get("/", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const cursor = collection.find({});
  const todos = await cursor.toArray();
  res.json(todos);
});

todoRouter.post("/create-todo", async (req: Request, res: Response) => {
  const { title, body, priority } = req.body;

  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  await collection.insertOne({
    title: title,
    body: body,
    priority: priority,
    isCompleted: false,
  });
  const cursor = collection.find({});
  const todos = await cursor.toArray();

  res.json(todos);
});

todoRouter.get("/:id", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const id = req.params.id;
  const todo = await collection.findOne({ _id: new ObjectId(id) });
  res.json(todo);
});

todoRouter.put("/update-todo/:id", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = db.collection("todos");
  const id = req.params.id;

  const { title, body, priority, isCompleted } = req.body;
  const filter = { _id: new ObjectId(id) };

  const updateTodo = await collection.updateOne(
    filter,
    { $set: { title, body, priority, isCompleted } },
    { upsert: true }
  );

  res.json(updateTodo);
});

todoRouter.delete("/delete-todo/:id", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const id = req.params.id;
  await collection.deleteOne({ _id: new ObjectId(id) });
  res.json({
    message: "Todo deleted successfully",
  });
});
