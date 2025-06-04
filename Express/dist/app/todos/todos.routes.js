"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.todoRouter = express_1.default.Router();
const filePath = path_1.default.join(__dirname, "../../../db/todo.json");
exports.todoRouter.get("/", (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json({
        message: "Hello from todos",
        data,
    });
});
exports.todoRouter.post("/create-todo", (req, res) => {
    const { id, title, completed } = req.body;
    //console.log(id,title,completed);
    res.send("Hey, I am a post request");
});
exports.todoRouter.get("/:id", (req, res) => {
    const { id, title, completed } = req.body;
    //console.log(id,title,completed);
    res.send("Hey, I am a post request");
});
exports.todoRouter.put("update-todo/:id", (req, res) => {
    const { id, title, completed } = req.body;
    //console.log(id,title,completed);
    res.send("Hey, I am a post request");
});
exports.todoRouter.delete("/delete-todo/:id", (req, res) => {
    const { id, title, completed } = req.body;
    //console.log(id,title,completed);
    res.send("Hey, I am a post request");
});
