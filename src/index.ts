import express from "express";
import db ,{ DatabaseResponse } from "./database";
import DatabaseManager from "./databaseManager";

const dbManager: DatabaseManager = db();


const app = express();
const port = 30000;

app.use(express.json());

app.post("/user", (req, res) => {
  const resp: DatabaseResponse = dbManager.addUser(req.body);
  res.status(resp.code);
  res.send(resp.message);
});

app.delete("/user", (req, res) => {
  if (req.body.id && req.body.id > 0) {
    const resp: DatabaseResponse = dbManager.deleteUser(req.body.id);
    res.status(resp.code);
    res.send(resp.message);
  } else {
    res.status(400)
    res.send("Bad Request")
  }
});

app.put("/user", (req, res) => {
  if (req.body.id && req.body.id > 0) {
    const resp = dbManager.updateUser(req.body);
    res.status(resp.code);
    res.send(resp.content);
  } else {
    res.status(400)
    res.send("Bad Request")
  }
});

app.post("/team", (req,res) => {
  const resp: DatabaseResponse = dbManager.addTeam(req.body);
  res.status(resp.code)
  res.send(resp.message)
})

app.delete("/team", (req,res) => {
  if (req.body.id && req.body.id > 0){
    const resp = dbManager.deleteTeam(req.body.id);
    res.status(resp.code)
    res.send(resp.message)
  } else {
    res.status(400)
    res.send("Bad Request")
  }
})

app.put("/team", (req,res) => {
  if (req.body.id && req.body.id > 0) {
    const resp = dbManager.updateTeam(req.body);
    res.status(resp.code)
    res.send(resp.message)
  } else {
    res.status(400)
    res.send("Bad Request")
  }
})

app.post("/addTeamMember", (req, res) => {
  const badRequestResponse = () => {
    res.status(400)
    res.send("Bad Request")
  }
  if(!req.body.team_id && !req.body.user_id) badRequestResponse()
  
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
