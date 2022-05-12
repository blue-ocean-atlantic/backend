require("./db");
require("dotenv").config();
const router = require('./routes');

/* === External Modules === */
const express = require("express");
const path = require("path");
const cors = require("cors");
const bp = require('body-parser');
const CreateSession = require('../server/authentication/middleware/auth');
const CookiesParser = require('../server/authentication/middleware/cookieParser');

/* === Server Configuration === */
const PORT = process.env.PORT || 3000;

/* === Instanced Modules === */
const app = express();

/* === Middleware === */
app.use(express.json({ limit: 500 }));
// app.use(CookiesParser);
// app.use(CreateSession);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


app.use('/', router);

/* === Server Listener === */
app.listen(PORT, () => {
  console.log(`Server is live at localhost:${PORT}.`);
});
