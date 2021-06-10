const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require("./db");
const cors = require("cors");
require("dotenv/config");

//Middleware
app.use(express.json());
app.use(morgan("tiny"));

const api = process.env.API_URL;
app.get(`${api}`, (req, res) => {
  res.send("hello from backend");
});

//Connect database
connectDB();

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
