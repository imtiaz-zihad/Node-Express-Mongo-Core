const http = require("http");
const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "./db/todo.json");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  //Get all todos
  if (pathname === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(data);
  }
  //Post a new todo
  else if (pathname === "/todos/create-todo" && req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      console.log(data);

      const { id, title, completed } = JSON.parse(data);
      console.log({ id, title, completed });

      const createAt = new Date().toISOString();
      const allTodo = fs.readFileSync(filePath, { encoding: "utf-8" });

      const parsedAllTodo = JSON.parse(allTodo);

      parsedAllTodo.push({ id, title, completed, createAt });
      fs.writeFileSync(filePath, JSON.stringify(parsedAllTodo, null, 2), {
        encoding: "utf-8",
      });

      res.end(JSON.stringify({ id, title, completed, createAt }, null, 2));
    });
  }
  // Get a specific todo
  else if (pathname === "/todo" && req.method === "GET") {
    const id = url.searchParams.get("id");
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parsedData = JSON.parse(data);
    const todo = parsedData.find((todo) => String(todo.id) === String(id));
    const stringifiedTodo = JSON.stringify(todo);

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(stringifiedTodo);
  } else if (pathname === "/todos/update-todo" && req.method === "PATCH") {
    const id = url.searchParams.get("id");

    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      console.log(data);

      const { title, completed } = JSON.parse(data);

      const allTodo = fs.readFileSync(filePath, { encoding: "utf-8" });

      const parsedAllTodo = JSON.parse(allTodo);

      const todoIndex = parsedAllTodo.findIndex(
        (todo) => String(todo.id) === String(id)
      );

      parsedAllTodo[todoIndex].title = title;
      parsedAllTodo[todoIndex].completed = completed;
      fs.writeFileSync(filePath, JSON.stringify(parsedAllTodo, null, 2), {
        encoding: "utf-8",
      });

      res.end(
        JSON.stringify(
          { id, title, completed, createAt: parsedAllTodo[todoIndex].createAt },
          null,
          2
        )
      );
    });
  } else if (pathname === "/todos/delete-todo" && req.method === "DELETE") {
    const id = url.searchParams.get("id");
  } else {
    res.end("Invalid Route\n");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server Is Alive ✅");
});

/**
 * /todos * GET - Retrieve all todos
 * /todos/create-todo * POST - Create a new todo
 * /todo * GET - Retrieve a specific todo
 */
