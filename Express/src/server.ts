import {MongoClient, ServerApiVersion} from "mongodb";
import app from "./app";
let server;
const port = 5000;

const uri = "mongodb+srv://todo_level2:mongolevel2@cluster0.x6gil.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Create a MongoDB client and connect to the database



const bootstrap = async () => {
    await client.connect();
    console.log("MongoDB connected successfully");  
  server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

bootstrap();
