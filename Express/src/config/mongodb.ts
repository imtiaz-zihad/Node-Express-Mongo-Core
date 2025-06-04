import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://todo_level2:mongolevel2@cluster0.x6gil.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
