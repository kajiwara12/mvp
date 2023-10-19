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

app.get("/things", (req, res) => {
  client.query("SELECT * FROM thing").then((result) => {
    res.json(result.rows);
  });
});

app.listen(PORT, () => {
  console.log("listening");
});
