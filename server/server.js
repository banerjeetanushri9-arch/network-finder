// const express = require("express");
// const cors = require("cors");
// const { Pool } = require("pg");


require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

// const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   database: "postgres",
//   user: "postgres",
//   password: "30@Banerjee",
// });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test route
app.get("/", (req, res) => {
  res.send("Network Finder Backend is running!");
});

// Get all towers
app.get("/towers", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT tower_id, latitude, longitude, operator, technology
      FROM cell_towers
      ORDER BY tower_id;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch towers",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});