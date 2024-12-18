const timestamp = new Date().toISOString();
console.log(`[INFO] [${timestamp}] Starting server... Initializing components.`);

import express, { Request, Response } from "express";
import session from 'express-session';
import sessionController from "./sessionController";
import userController from "./userController";
import teamController from "./teamController";
import categoryController from "./categoryController";
import taskController from "./taskController";
import teamMemberController from "./teamMembersController"

const app = express();

app.use(express.json());

app.use(session({
  secret: 'yourSecretKey', 
  resave: false,            
  saveUninitialized: true,  
  cookie: { maxAge: 60000 } 
}));

app.post("/create/user", userController.create)
app.post("/update/user", userController.update)

app.post("/create/team",teamController.create)
app.post("/update/team",teamController.update)
app.post("/delete/team",teamController.delete)

app.post("/create/category",categoryController.create)

app.post("/create/task", taskController.create);
app.post("/update/task",taskController.update);
app.post("/delete/task",taskController.delete)
app.get("/user/taks", taskController.get);

app.post("/create/team-invite", teamMemberController.invite);
app.get("/get/team-members",teamMemberController.getMembers)
app.post("/invite/team/accept", teamMemberController.accept)

app.get("/login",sessionController.login)
app.get("/logout",sessionController.logout)



const port = process.env.PORT || 30000; // Tornar a porta configurável via variável de ambiente

app.listen(port, () => {
  const timestamp = new Date().toISOString();
  console.log(`[INFO] [${timestamp}] Server is running at http://localhost:${port} - Ready to accept requests.`);
});


export default app