/* === External Modules === */
const express = require('express');
const path = require('path');
const cors = require('cors');
const bp = require('body-parser');
const db = require('./db/index.js')
const { searchListings,getLandingListings } = require('./db/controllers/searchListings.js');
const {getLandingUsers} = require('./db/controllers/searchUsers.js');

require('dotenv').config();

/* === ImageKit authentication === */
const ImageKit = require('imagekit');
// const fs = require('fs');

/* === Server Configuration === */
const PORT = process.env.PORT || 3000;

/* === Instanced Modules === */
const app = express();

/* === Middleware === */
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

// serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

/* === API Routes === */

app.get('/api/imagekit', (req, res) => {
  // Look into if this needs to have additional measures for security.
  // i.e. send only if source of request is our website?

  const imagekit = new ImageKit({
    publicKey: 'public_FMjtxsWyzDWFsDCkU+3LPha1J2E=',
    privateKey: process.env.IMGKIT_PRIVATE_KEY,
    urlEndpoint: 'https://ik.imagekit.io/joshandromidas/',
  });

  const authenticationParameters = imagekit.getAuthenticationParameters();

  res.json(authenticationParameters);
});

/* === Page Routes === */


app.get('/results', (req, res) => {
  const zipCode = req.query.zipCode;
  searchListings(zipCode, res);
  res.send();
});

//get data from users VC and Listings VC
app.get('/api/listings/landing', (req,res) => {
  // let promises = [];
  // let listingData = getLandingListings(req,res)
  // let userData = getLandingUsers(req,res)
  // promises.push(listingData);
  // promises.push(userData);
  // Promise.all(promises)
  // .then((data) => {
  //   let listings = data[0];
  //   let users = data[1];
  //     //cross reference and combine data into formatted object
  //     //lets figure out mongo aggregation combining 2 collections on the id
  //   let dreamData =[];
  //   listings.forEach((listing) =>{
  //   })
  // })

  let listingData = getLandingListings().then((data) => {
    console.log(data[1])
    let formattedData = [];
    data.forEach((listing) => {
        formattedData.push({
          listing_id: listing._id,
          type: listing.type,
          title: listing.title,
          description: listing.description,
          image_url: listing.images_urls,
          user_id:listing.created_by[0].email,
          user_avatar_url: listing.created_by[0].photo,
        })
      });
      res.send(formattedData);
  });

  // console.log(formattedData);
  // res.send(formattedData);

})


/* === Server Listener === */
app.listen(PORT, () => {
  console.log(`Server is live at localhost:${PORT}.`);
});
