const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "060400",
  database: "sharegx",
});

app.post("/data", (req, res) => {
  const { destino, nome, id } = req.body;
  let SQL = "INSERT INTO clientes (id, destino, nome) VALUES (?, ?, ?)";
  db.query(SQL, [id, destino, nome], (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/data', (req, res) => {
  const sql = 'SELECT * FROM clientes';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(result);
    }
  });
});

app.delete("/data/:id", (req, res) => {
  const { id } = req.params;
  let SQL = "DELETE FROM clientes WHERE id = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(3001, () => {
  console.log("Rodando servidor");
});
