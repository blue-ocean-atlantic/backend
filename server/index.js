/* === External Modules === */
const express = require("express");
const path = require("path");
const cors = require("cors");
// const bp = require('body-parser');
const { searchListings, details, createPost } = require("./db/controllers");
require("./db");

require("dotenv").config();

/* === ImageKit authentication === */
const ImageKit = require("imagekit");
// const fs = require('fs');

/* === Server Configuration === */
const PORT = process.env.PORT || 3000;

/* === Instanced Modules === */
const app = express();

/* === Middleware === */
app.use(express.json({ limit: 500 }));
// app.use(bp.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));

/* === API Routes === */

app.get("/api/imagekit", (req, res) => {
  // Look into if this needs to have additional measures for security.
  // i.e. send only if source of request is our website?

  const imagekit = new ImageKit({
    publicKey: "public_FMjtxsWyzDWFsDCkU+3LPha1J2E=",
    privateKey: process.env.IMGKIT_PRIVATE_KEY,
    urlEndpoint: "https://ik.imagekit.io/joshandromidas/",
  });

  const authenticationParameters = imagekit.getAuthenticationParameters();

  res.json(authenticationParameters);
});

/* === Page Routes === */

//product/map page
app.get("/results", (req, res) => {
  const {
    query: { zipCode },
  } = req;

  searchListings(zipCode)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.log("ERR product/map page route", err);
      res.send(error);
    });
});

//product/service info page
app.get("/details", (req, res) => {
  const id = req.query.id;
  details(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("ERR product/service route", err);
      res.send(err);
    });
});

//create a post page
app.post("/las", (req, res) => {
  const {
    user_id,
    title,
    description,
    type,
    images,
    available_date } = req.body;

  createPost(user_id, title, description, type, images, available_date)
  .then((results) => {
    req.send(results)
  })
  .catch((err) => {
    console.log('something went wrong in createPost');
    res.send(err);
  })
});

/* === Server Listener === */
app.listen(PORT, () => {
  console.log(`Server is live at localhost:${PORT}.`);
});
