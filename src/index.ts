import express from "express";
import db from "./database";
import DatabaseManager, { Category, DatabaseResponse, DatabaseTables, Priority, Status, Team, User } from "./databaseManager";
import { DiffieHellmanGroup } from "crypto";

const dbManager: DatabaseManager = db();


const app = express();
const port = 30000;

app.use(express.json());
const data = {
  creationDate: Date.now(),
  deadline: "Date",
  name: "string",
  description: "string",
  category: 1,
  priority: 1,
  status: 1,
  team: 1,
  responsible: 1
}

const newCategory:Category = {name:"Teste"}
const newPriority:Priority = {name:"Teste"}
const newStatus:Status = {name:"Teste"}
const newUser:User = {name:"Teste",email:"Teste",login:"teste",password:"teste"}
const newTeam:Team = {name:"Teste", owner:1}

console.log(dbManager.insert({table:DatabaseTables.CATEGORY, data:newCategory}))
console.log(dbManager.insert({table:DatabaseTables.PRIORITY, data:newPriority}))
console.log(dbManager.insert({table:DatabaseTables.STATUS, data: newStatus}))
console.log(dbManager.insert({table:DatabaseTables.USER, data:newUser}))
console.log(dbManager.insert({table:DatabaseTables.TEAM, data:newTeam}))

console.log(dbManager.insert({table:DatabaseTables.TASK, data}))


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
