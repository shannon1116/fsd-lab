const express = require("express");
const app = express();
const { Pool } = require("pg");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.listen(3000, () => console.log("Server running"));