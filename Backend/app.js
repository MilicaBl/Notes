var express = require("express");
var path = require("path");
var logger = require("morgan");
var mysql = require("mysql2");
const cors = require("cors");
var indexRouter = require("./routes/index");

// KOPPLA TILL MYSQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Notes",
  password: "root"
});

var app = express();
app.use(cors());

app.use(express.json());
app.use("/", indexRouter);

// HÄMTA ALLA NOTES
app.get("/notes/:user", async (req, res) => {
  try {
    const [rows] = await connection
      .promise()
      .execute("SELECT * FROM note WHERE user = ?", [req.params.user]);
    res.json(rows);
  } catch (err) {
    res.json(err.message);
  }
});

// HÄMTA EN SPECIFIK NOTE
app.get("/notes/:user/:id", async (req, res) => {
  try {
    const [rows] = await connection
      .promise()
      .execute("SELECT * FROM note WHERE user = ? AND id = ?", [
        req.params.user,
        req.params.id
      ]);
    res.json(rows[0]);
  } catch (err) {
    res.json(err.message);
  }
});

// POSTA EN NY NOTE
app.post("/notes", async (req, res) => {
  try {
    const result = await connection.execute(
      "INSERT INTO note (user,title,content) VALUES (?, ?, ?)",
      [req.body.user, req.body.title, req.body.content]
    );
    console.log(result);
    res.json("Ny post sparad!");
  } catch (err) {
    res.json(err.message);
  }
});

// ÄNDRA EN NOTE
app.put("/notes/:user/:id", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  try {
    const [rows] = await connection
      .promise()
      .execute(
        "UPDATE note SET title= ?, content= ? WHERE user= ? AND id = ?",
        [title, content, req.params.user, req.params.id]
      );
    res.json(rows);
  } catch (err) {
    res.json(err.message);
  }
});

// LOGGA IN
app.post("/login", async (req, res) => {
  try {
    const [rows] = await connection
      .promise()
      .execute(
        "SELECT userID FROM users WHERE userName = ? AND userPassword = PASSWORD(?)",
        [req.body.userName, req.body.userPassword]
      );
    res.json(rows[0]);
  } catch (err) {
    res.json(err.message);
  }
});

// FÖR EV REGISTRERING
// app.post("/user", async (req, res) => {
//   try{
//     const result=await connection.execute(
//         "INSERT INTO users (userName, userPassword) VALUES (?, PASSWORD(?))",
//         [req.body.userName, req.body.userPassword]
//     )
//     res.json(result)
// }catch(err){
//     console.log(err)
//     res.json(err.message)
// }
// });

module.exports = app;
