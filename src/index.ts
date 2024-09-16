import express from "express";
import db from "./database";
import DatabaseManager, { DatabaseResponse, DatabaseTables } from "./databaseManager";
import { createHash } from 'crypto';

const dbManager: DatabaseManager = db();


const app = express();
const port = 30000;

app.use(express.json());

app.post("/user", (req, res) => {
  const hash = createHash('sha256');
  hash.update(req.body.password)
  const newUser = {name:req.body.name,
    email:req.body.email,
    login:req.body.login,
    password:hash.digest('hex')}
  const dbResponse:DatabaseResponse = dbManager.insert({table:DatabaseTables.USER,data:newUser})
  res.status(dbResponse.code)
  res.send(dbResponse.message)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
