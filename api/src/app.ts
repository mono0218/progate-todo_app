import express from "express";
import { databaseManager } from "@/db/database_manager";

export const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/tasks",async (req,res)=>{
    const db = await databaseManager.getInstance();
    const result = await db.all("SELECT * FROM tasks");
    res.header('Access-Control-Allow-Origin', '*')
    res.send(result)
})

app.post("/add",async(req,res)=>{
    const db = await databaseManager.getInstance();
    const data = req.body.title
    const result = await db.run(`INSERT INTO tasks(title,status) VALUES (?,?);`,data, 0);
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', "X-Requested-With, Origin,Content-Type, Accept")
    res.status(200)
    res.send()
})

app.post("/done", async(req,res)=>{
    const db = await databaseManager.getInstance();
    const data = Number(req.body.id)
    await db.run('UPDATE tasks SET status = ? WHERE id = ?',  1, data);

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', "X-Requested-With, Origin,Content-Type, Accept")
    res.status(200)
    res.send()
})

app.post("/delete",async(req,res)=>{
    const db = await databaseManager.getInstance();
    await db.run('DELETE FROM tasks WHERE status = ?',1);

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', "X-Requested-With, Origin,Content-Type, Accept")
    res.status(200)
    res.send()
})