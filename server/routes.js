const ImageKit = require("imagekit");
const router = require('express').Router();
const {
  searchListings,
  details,
  createPost,
  getLanding,
} = require("./db/controllers");


/* === API Routes === */
router.get("/api/imagekit", (req, res) => {
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


/* === Controller Routes === */
//product/map page
router.get("/results", (req, res) => {
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
router.get("/details", (req, res) => {
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
router.post("/las", (req, res) => {
  const {
    user_id,
    title,
    description,
    type,
    images,
    available_date } = req.body;

  createPost(user_id, title, description, type, images, available_date)
  .then((results) => {
    console.log(results);
    req.send(results)
  })
  .catch((err) => {
    console.log('something went wrong in createPost');
    res.send(err);
  })

});

// getLanding
router.get("/api/listings/landing", (req, res) => {
  getLanding()
  .then((results) => {
    res.send(results)
  })
  .catch((err) => {
    console.log('something broke while getting landing', err);
    res.send(err);
  })
});

module.exports = router;