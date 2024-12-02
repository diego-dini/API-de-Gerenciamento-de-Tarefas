const timestamp = new Date().toISOString();
console.log(`[INFO] [${timestamp}] Starting server... Initializing components.`);

import express, { Request, Response } from "express";
import session from 'express-session';
import sessionController from "./sessionController";
import userController from "./userController";
import teamController from "./teamController";
import categoryController from "./categoryController";
import taskController from "./taskController";

const app = express();
const port = 30000;

app.use(express.json());

app.use(session({
  secret: 'yourSecretKey', 
  resave: false,            
  saveUninitialized: true,  
  cookie: { maxAge: 60000 } 
}));

app.post("/create/user",userController.create)
app.post("/update/user",userController.update)

app.post("/create/team",teamController.create)
app.post("/update/team",teamController.update)
app.post("/delete/team",teamController.delete)

app.post("/create/category",categoryController.create)

app.post("/create/task",taskController.create)

app.get("/login",sessionController.login)
app.get("/logout",sessionController.logout)

app.listen(port, () => {
  const timestamp = new Date().toISOString();
  console.log(`[INFO] [${timestamp}] Server is running at http://localhost:${port} - Ready to accept requests.`);
});

