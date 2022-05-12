const ImageKit = require("imagekit");
const router = require('express').Router();
const {
  searchListings,
  details,
  createPost,
  getLanding,
  getUserInfo,
  getActiveListings,
  getCompletedListings,
  getReceivedListings,
  getListingDetails,
  createUser,
} = require("./db/controllers");
const { getAllZipcodesAndGeolocations, getLongAndLatFrom } = require('./db/controllers/Zipcodes');
const { getListings } = require('./db/controllers/Listings');
const { calculateDistance } = require('./utils');


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

// 1) getUserInfo
router.get("/api/user", (req, res) => {
  const { id } = req.query;
  getUserInfo(id)
  .then((results) => {
    res.send(results)
  })
  .catch((err) => {
    console.log('something broke while getting landing', err);
    res.send(err);
  })
});

// 2) getActiveListings
router.get("/api/listings/active", (req, res) => {
  const { donor_id } = req.query;
  getActiveListings(donor_id)
  .then((results) => {
    res.send(results)
  })
  .catch((err) => {
    console.log('something broke while getting landing', err);
    res.send(err);
  })
});

// 3) getCompletedListings
router.get("/api/listings/completed", (req, res) => {
  const { donor_id } = req.query;

  getCompletedListings(donor_id)
  .then((results) => {
    res.send(results)
  })
  .catch((err) => {
    console.log('something broke while getting landing', err);
    res.send(err);
  });
});

// 4) getReceivedListings
router.get("/api/listings/received", (req, res) => {
  const { receiver_id } = req.query;

  getReceivedListings(receiver_id)
  .then((results) => {
    res.send(results)
  })
  .catch((err) => {
    console.log('something broke while getting landing', err);
    res.send(err);
  });
});

// 5) getListingDetails
router.get("/api/listing", (req, res) => {
  const { id } = req.query;

  getListingDetails(id)
  .then((results) => {
    res.send(results)
  })
  .catch((err) => {
    console.log('something broke while getting landing', err);
    res.send(err);
  });
});

// // 6) getListings
// router.get("/api/listings", (req, res) => {
//   const { zipcode, latitude, longitude, radius, count } = req.query;

//   if (!zipcode) {
//     res.json([]);
//   }

//   if (!latitude && !longitude) {
//     getLongAndLatFrom(zipcode)
//     .then((response) => {
//       console.log(response);
//       latitude = response.latitude;
//       longitude = response.longitude;
//     })
//     .catch((error) => {
//       console.log(`/api/listings get longitude and latitude error: ${error}`);
//       res.sendStatus(500).json(error);
//     });
//   }

//   radius = radius ? radius : 5;
//   count = count ? count : 10;

//   let nearbyZipcodes = [];

//   // const start = Date.now();

//   getAllZipcodesAndGeolocations()
//   .then((zipcodes) => {
//     zipcodes.forEach((zipcode) => {
//       if (calculateDistance(latitude, longitude, zipcode.latitude, zipcode.longitude) < limit) {
//         nearbyZipcodes.push(zipcode.zip);
//       }
//     });

//     // const duration = Date.now() - start;

//     // console.log('nearby zipcodes calculations completed');
//     // console.log(nearbyZipcodes);
//     // console.log(nearbyZipcodes.length);
//     // console.log(duration);
//   })
//   .catch((error) => {
//     console.log(`/api/listings find nearby zipcodes error: ${error}`);
//     res.sendStatus(500).json(error);
//   });


//   const results = [];

//   getListings({ zipcode: { $in: zipcodes } })
//   .then((listings) => {
//     results

//     // const duration = Date.now() - start;

//     // console.log('nearby zipcodes calculations completed');
//     // console.log(nearbyZipcodes);
//     // console.log(nearbyZipcodes.length);
//     // console.log(duration);
//   })
//   .catch((error) => {
//     console.log(`/api/listings find nearby zipcodes error: ${error}`);
//     res.sendStatus(500).json(error);
//   });

// });

// 7) get latitude and longitude from zipcode

// 8) createUser?
router.post("/api/user", (req, res) => {
  // const { id } = req.query;
  console.log("we made it", req.body)
  res.send();

  createUser()
  .then((results) => {
    res.send(results)
  })
  .catch((err) => {
    console.log('something broke while getting landing', err);
    res.send(err);
  });
});

// 9) createPost
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

// 10) ??
router.put("/api/user", (req, res) => {
  const { id } = req.query;
  console.log("we made it", req.body)
  res.send();
  console.log('made it into 10 put')

  // createUser()
  // .then((results) => {
  //   res.send(results)
  // })
  // .catch((err) => {
  //   console.log('something broke while getting landing', err);
  //   res.send(err);
  // });
});

// 11) ??
router.put("/api/listing", (req, res) => {
  const { id } = req.query;
  console.log("we made it", req.body)
  res.send();

  console.log('inside route 11');

  // createUser()
  // .then((results) => {
  //   res.send(results)
  // })
  // .catch((err) => {
  //   console.log('something broke while getting landing', err);
  //   res.send(err);
  // });
});

module.exports = router;