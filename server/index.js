/* === External Modules === */
const express = require('express');
const path = require('path');
const cors = require('cors');
const bp = require('body-parser');
const db = require('./db/index.js')
const { searchListings,getLandingListings, setNewListing} = require('./db/controllers/searchListings.js');

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
//does not deal with bad data
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
})

app.post('/api/listings', (req,res) => {
const {user_id,title,description,type,images,available_date,created_date, zipcode,longitude,latitude, city} = req.body;

  let newListing = {
    id: 10101010110101,
    created_by: user_id,
    type,
    title,
    description,
    availableDate: available_date,
    image_urls: images,
    created_at: created_date,
    city,
    zipcode,
    geolocation: [{"longitude": longitude, "latitude": latitude}],
    ended: false,
    ended_time: "",
  }

setNewListing(newListing).save()
.then(() => {
  console.log('listing successfully created')
  res.send({listing_id: newListing.id});
})
.catch((err)=> console.log(err, 'failed to create listing'));
});





/* === Server Listener === */
app.listen(PORT, () => {
  console.log(`Server is live at localhost:${PORT}.`);
});
