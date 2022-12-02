import express from "express";
import {v4 as uuidv4} from "uuid";
import cors from "cors";
import mySql from "mysql";
const app = express();

app.use(cors());
app.use(express.json());

const db = mySql.createPool({
    host: "containers-us-west-88.railway.app",
    user: "root",
    password: "B2TvBGMiW6lPFGN0Z9Ws",
    database: "railway",
    port: "7157"
})

app.post("/turns", (req, res) => {
    const room = req.body.room;
    const t = `select turns from rooms where room = '${room}'`;

    db.query(t, (err, result) => {
        console.log(err);
        res.send(result);
    })
})

app.post("/setTurns", (req, res) => {
    const t = req.body.v;
    const r = req.body.room;
    const q = `update rooms set turns='${t}' where room='${r}'`;

    db.query(q, (err, result) => {
        console.log(err);
    })
})

app.post("/login", (req, res) => {
    const user = req.body.user;
    const room = req.body.room;
    const userId = uuidv4();
    const i = `insert into rooms (room, player1, turns) values ('${room}', '${user}', '["","","","","","","","",""]');`;
    res.json({user, room, userId});
    
    db.query(i, (err, result) => {
        if (err) {
            if(err.errno===1062) {
                db.query(`update rooms set player2 = '${user}' where room = '${room}'`, (e, r) => {
                    console.log(e);
                })
            }
        }
    });
});

app.post("/wait", (req, res) => {
    const room = req.body.room;
    const w = `select player2 from rooms where room = '${room}';`;

    db.query(w, (err, result) => {
        res.send(result)
    });
})

app.listen(5000, () => {
    console.log("Server is running on port 5000!")
});