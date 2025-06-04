import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
export const todoRouter = express.Router();

const filePath = path.join(__dirname, "../../../db/todo.json");

todoRouter.get("/all-todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });

  res.json({
    message: "Hello from todos",
    data,
  });
});


todoRouter.post("/create-todo", (req: Request, res: Response) => {
  const { id, title, completed } = req.body;
  //console.log(id,title,completed);

  res.send("Hey, I am a post request");
});