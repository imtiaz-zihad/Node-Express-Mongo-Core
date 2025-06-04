import { log } from "console";
import express, { Application, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { todoRouter } from "./app/todos/todos.routes";
const app: Application = express();
app.use(express.json());

const filePath = path.join(__dirname, "db/todo.json");
const userRouter = express.Router();


//Router manager 
app.use("/users", userRouter);
app.use("/todos", todoRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello People!");
});



export default app;
