const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const colors = require("colors");

// local imports
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// db connection
connectDB();

// routes
app.get("/", (req, res) => res.send("API working"));

// listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.green));
