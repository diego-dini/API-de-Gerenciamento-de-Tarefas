import express from "express";
import db from "./database";
import DatabaseManager, { DatabaseResponse, DatabaseTables } from "./databaseManager";
import { DiffieHellmanGroup } from "crypto";

const dbManager: DatabaseManager = db();


const app = express();
const port = 30000;

app.use(express.json());
const data = {
  email: "a",
  login: "4321",
  password: "1234",
  name: "Diego"
}
console.log(dbManager.select({table: DatabaseTables.USER,column: "id",value:"2"}))


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
