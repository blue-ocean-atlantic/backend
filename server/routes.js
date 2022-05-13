const ImageKit = require("imagekit");
const router = require('express').Router();
const CreateUserSchema = require('./authentication/models/userSchema.js')
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
  authUser,
  checkUsername,
  authSession,
  authModel,
} = require("./db/controllers");
const { getAllZipcodesAndGeolocations, getLongAndLatFrom } = require('./db/controllers/Zipcodes');
const { getListings, getListingsAndDonors, createNewListing, getNextListingId, updateListing } = require('./db/controllers/Listings');
const { createNewUser, getNextUserId, updateUser } = require('./db/controllers/Users');
const { getAppointments, createNewAppointment, getNextAppointmentId, updateAppointment } = require('./db/controllers/Appointments');;
const { calculateDistance } = require('./utils');


/* === Authentication Routes === */
router.post('/api/login', async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  return await authUser.get({ username })
  .then(result => {
    console.log('result at post login', result)
    if (!result.length || !authUser.compare(password, result[0].password, result[0].salt)) {
      throw new Error('Username and password do not match');
    } else {
      res.cookie("username", username)
      res.send(result[0].username);
    }
  })
  .catch(error => {
    console.log('hi error', error);
    res.redirect(308, '/')
  })
});

router.post('/api/signup', (req, res, next) => {
  const first_name = req.body.values.firstName;
  const last_name = req.body.values.lastName;
  const email = req.body.values.email;
  const zipcode = req.body.values.zipcode;
  const username = req.body.values.username;
  const password = req.body.values.password;
  //generate a listing_id and attach it to new user
  getUserInfo()
  .then((lastUser) => {
    let nextId=Number(lastUser.user_id) + 1;
    return nextId;
  })
  .then((nextId) => {
    return authUser.get({username})
    .then(result => {
      console.log('result', result)
      if (result[0]) {
        console.log('email or username already exists')
        res.write('fail')
        res.end()
      } else {
        authUser.create({ first_name, last_name, email, zipcode, username, password, nextId })
          .then(result => {
            console.log('profile created successfully')
            res.write('success');
            res.end();
          })
          .catch(error => {
            console.log('error at catch', error);
          })
      }
    })
    .catch(error => {
      console.log('error caught', error);
      res.send('error at duplicate email')
    })
  })
});

///demo purposes
router.get('/api/test', (req, res, next) => {
    if (req.cookies.username === '') {
    res.sendStatus(401);
    console.log('TEST ROUTE: currently no username');
  } else {
    console.log('TEST ROUTE: current username', req.cookies.username);
  }
})


router.get('/api/logout', (req, res, next) => {
  res.clearCookie('username');
  next();
});




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
router.get("/api/user/:id", (req, res) => {
  const { id } = req.params;
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
router.get("/api/listings/active/:donor_id", (req, res) => {
  const { donor_id } = req.params;
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
router.get("/api/listings/completed/:donor_id", (req, res) => {
  const { donor_id } = req.params;

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
router.get("/api/listings/received/:receiver_id", (req, res) => {
  const { receiver_id } = req.params;

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
router.get("/api/listing/:id", (req, res) => {
  const { id } = req.params;

  getListingDetails(id)
  .then((results) => {
    res.send(results)
  })
  .catch((err) => {
    console.log('something broke while getting landing', err);
    res.send(err);
  });
});

// 6) getListings
router.get("/api/listings", async function (req, res) {
  const { zipcode } = req.query;
  let { query, longitude, latitude, radius, count } = req.query;

  if (!zipcode) {
    res.json([]);
  }

  const start = Date.now();

  if (!latitude && !longitude) {
    try {
      let response =  await getLongAndLatFrom(zipcode);
      latitude = response.latitude;
      longitude = response.longitude;
    } catch(error) {
      console.log(`/api/listings get longitude and latitude error: ${error}`);
      res.status(500).json(error);
    };
  }

  radius = radius || 5;
  count = count || 10;
  query = query || '';

  const nearbyZipcodes = [];
  const nearbyZipcodesDistances = {};

  try {
    const allZipCodes = await getAllZipcodesAndGeolocations();

    allZipCodes.forEach((zipcode) => {
      let distance = calculateDistance(latitude, longitude, zipcode.latitude, zipcode.longitude);
      if ( distance < radius) {
        nearbyZipcodes.push(zipcode.zip);
        nearbyZipcodesDistances[zipcode.zip] = distance;
      }
    });
  } catch(error) {
    console.log(`/api/listings find nearby zipcodes error: ${error}`);
    res.status(500).json(error);
  };

  const returnListings = [];
  const listingFields = 'listing_id type title description images_urls zipcode latitude longitude donor_id -_id'
  const donorOptions = 'user_id email photo_url -_id';

  getListingsAndDonors({
    $and:
    [ { $or: //search by query string
        [ { title: { $regex: query, $options: 'i' } }, { description: { $regex: query, $options: 'i' } }]
      },
      { zipcode: { $in: nearbyZipcodes }
    }] }, listingFields, donorOptions)
  .then((listings) => {

    listings.forEach((listing) => {

      listing = listing.toObject();

      listing.image_url = listing.images_urls.length > 0 ? listing.images_urls[0] : '';
      listing.donor_email = listing.donor[0].email;
      listing.donor_avatar_url = listing.donor[0].photo_url;
      listing.distance = nearbyZipcodesDistances[listing.zipcode];

      delete listing.images_urls;
      delete listing.donor;
      delete listing.id;

      returnListings.push(listing);
    });

    //sort by distance from closest to furthest
    returnListings.sort((a, b) => a.distance - b.distance);

    const duration = Date.now() - start;
    console.log(`/api/listings duration = ${duration}ms`);

    res.json(returnListings.slice(0, count));
  })
  .catch((error) => {
    console.log(`/api/listings get listings and their donors error: ${error}`);
    res.status(500).json(error);
  });

});

// 7) get latitude and longitude from zipcode

// 8) create a new user
router.post("/api/user", (req, res) => {
  const {
    first_name,
    last_name,
    username,
    password,
    email,
    zipcode
  } = req.body;

  const newUserParams = {
    first_name,
    last_name,
    username,
    password,
    email,
    zipcode
  };

  getNextUserId()
  .then((result) => {
    let user_id = result.user_id || 0;
    newUserParams.user_id = user_id + 1;
    return createNewUser(newUserParams);
  })
  .then((result) => {
    res.status(201).json(result);
  })
  .catch((error) => {
    console.log(`Error creating a new user at express app: ${error}`);
    res.status(500).json(error);
  });
});

// 9) create a new listing
router.post("/api/listing", async function (req, res) {
  const {
    donor_id,
    type,
    title,
    description,
    available_date,
    zipcode
  } = req.body;
  let { images_urls, category, condition, longitude, latitude } = req.body;

  category = category || '';
  condition = condition || '';
  images_urls = images_urls || [];

  if (!latitude && !longitude) {
    try {
      let response =  await getLongAndLatFrom(zipcode);
      latitude = response.latitude;
      longitude = response.longitude;
    } catch(error) {
      console.log(`POST /api/listing get longitude and latitude error: ${error}`);
      res.status(500).json(error);
    };
  }

  const newListingParams = {
    donor_id,
    type,
    title,
    description,
    available_date,
    images_urls,
    zipcode,
    longitude,
    latitude,
    category,
    condition
  };

  getNextListingId()
  .then((result) => {
    let listing_id = result.listing_id || 0;
    newListingParams.listing_id = listing_id + 1;
    return createNewListing(newListingParams);
  })
  .then((result) => {
    res.status(201).json(result);
  })
  .catch((error) => {
    console.log(`Error creating a new listing at express app: ${error}`);
    res.status(500).json(error);
  });

});

// 10) update user
router.put("/api/user/:user_id", (req, res) => {
  const { user_id } = req.params;

  updateUser(user_id, req.body)
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    console.log(`Error updating user (id: ${user_id} ) at express app: ${error}`);
    res.status(500).json(error);
  });
});

// 11) update listing
router.put("/api/listing/:listing_id", (req, res) => {
  const { listing_id } = req.params;

  updateListing(listing_id, req.body)
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    console.log(`Error updating listing (id: ${listing_id} ) at express app: ${error}`);
    res.status(500).json(error);
  });
});

// 12) mark listing as completed
router.put("/api/listing/:listing_id/completed", (req, res) => {
  const { listing_id } = req.params;
  const { receiver_id, completed_time } = req.body;

  if (!receiver_id || !completed_time) {
    res.status(500).json('Error: Listing cannot be marked as complete. Missing/invalid parameter(s).');
  }

  let updateParams = { receiver_id, completed_time, completed: true };

  updateListing(listing_id, updateParams)
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    console.log(`Error updating listing (id: ${listing_id} ) at express app: ${error}`);
    res.status(500).json(error);
  });
});

// 13) create a new appointment
router.post("/api/appointment", (req, res) => {
  const {
    donor_id,
    receiver_id,
    listing_id,
    time
  } = req.body;

  const newAppointmentParams = {
    donor_id,
    receiver_id,
    listing_id,
    time
  };

  getNextAppointmentId()
  .then((result) => {
    let appointment_id = result.appointment_id || 0;
    newAppointmentParams.appointment_id = appointment_id + 1;
    return createNewAppointment(newAppointmentParams);
  })
  .then((result) => {
    res.status(201).json(result);
  })
  .catch((error) => {
    console.log(`Error creating a new appointment at express app: ${error}`);
    res.status(500).json(error);
  });
});

// 14) update an appointment - NOT YET READY
router.put("/api/appointment/:appointment_id", (req, res) => {
  const { appointment_id } = req.params;

  // const { donor_id, receiver_id, listing_id, time } = req.body;
  // let updateParams = { donor_id, receiver_id, listing_id, time };

  updateAppointment(listing_id, req.body)
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    console.log(`Error updating appointment (id: ${appointment_id} ) at express app: ${error}`);
    res.status(500).json(error);
  });
});

// 15) get appointments of a user
router.get("/api/appointments/user/:user_id", (req, res) => {
  const { user_id } = req.params;

  getAppointments(user_id)
  .then((results) => {
    res.json(results)
  })
  .catch((error) => {
    console.log(`Error getting appointments for (user_id: ${user_id} ) at express app: ${error}`);
    res.status(500).json(error);
  });
});

// 16) checkUsername
router.get("/api/username", (req, res) => {
  const { username } = req.query;

  checkUsername(username)
  .then((results) => {
    res.send(results)
  })
  .catch((err) => {
    console.log('something broke while getting landing', err);
    res.send(err);
  });
});

module.exports = router;