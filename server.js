import express from "express";
import pg from "pg";
import dotenv from "dotenv";

const { PORT, DATABASE_URL } = process.env;
dotenv.config();
const client = new pg.Client({
  connectionString: DATABASE_URL,
});
await client.connect();

const app = express();

app.get("/things", (req, res) => {
  client.query("SELECT * FROM thing").then((result) => {
    res.send(result.rows);
  });
});

app.listen(PORT, () => {
  console.log("listening");
});
