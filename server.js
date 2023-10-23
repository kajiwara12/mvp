import express from "express";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const { PORT, DATABASE_URL } = process.env;
const client = new pg.Client({
  connectionString: DATABASE_URL,
});
await client.connect();
app.use(express.static("public"));
app.use(express.json());

app.get("/player", (req, res) => {
  client
    .query("SELECT * FROM player ORDER BY score DESC LIMIT 5")
    .then((result) => {
      res.json(result.rows);
    });
});

app.post("/player", (req, res) => {
  const name = req.body.name;
  const score = req.body.score;
  client
    .query("INSERT INTO player(name,score) VALUES ($1,$2) RETURNING *", [
      name,
      score,
    ])
    .then((result) => {
      res.json(result.rows[0]);
    });
});

app.listen(PORT, () => {
  console.log("listening");
});
