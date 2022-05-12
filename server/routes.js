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

// 6) getListingDetails

// 7) getListingDetails

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

// 12) checkUsername
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