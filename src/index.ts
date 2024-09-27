import express, { Request, Response } from "express";
import session from 'express-session';
import { sessionController } from "./sessionController";
import userController from "./userController";
import teamController from "./teamController";

const app = express();
const port = 30000;

app.use(express.json());

app.use(session({
  secret: 'yourSecretKey', 
  resave: false,            
  saveUninitialized: true,  
  cookie: { maxAge: 60000 } 
}));

app.post("/register/user",userController.register)
app.post("/update/user",userController.update)

app.post("/create/team",teamController.create)
app.post("/update/team",teamController.update)
app.post("/delete/team",teamController.delete)

app.get("/login",sessionController.login)
app.get("/logout",sessionController.logout)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

