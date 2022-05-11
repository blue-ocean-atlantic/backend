require("./db");
require("dotenv").config();
const router = require('./routes');

/* === External Modules === */
const express = require("express");
const path = require("path");
const cors = require("cors");

/* === Server Configuration === */
const PORT = process.env.PORT || 3000;

/* === Instanced Modules === */
const app = express();

/* === Middleware === */
app.use(express.json({ limit: 500 }));
app.use('/', router); // this sends stuff to the router
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// serve static files
// app.use(express.static(path.join(__dirname, "../client/dist")));

/* === Server Listener === */
app.listen(PORT, () => {
  console.log(`Server is live at localhost:${PORT}.`);
});
