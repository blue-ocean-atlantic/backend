const { getAllZipcodesAndGeolocations } = require('./db/controllers/Zipcodes');
const { calculateDistance } = require('./utils');
const db = require('./db');

const findNearbyZipcodes = (zipcode, latitude, longitude, limit) => {

  let nearbyZipcodes = [];

  const start = Date.now();

  getAllZipcodesAndGeolocations()
  .then((zipcodes) => {
    zipcodes.forEach((zipcode) => {
      if (calculateDistance(latitude, longitude, zipcode.latitude, zipcode.longitude) < limit) {
        nearbyZipcodes.push(zipcode.zip);
      }
    });

    const duration = Date.now() - start;

    console.log('nearby zipcodes calculations completed');
    console.log(nearbyZipcodes);
    console.log(nearbyZipcodes.length);
    console.log(duration);
    process.exit();
  })
  .catch((error) => {
    console.log(`Find nearby zipcodes error: ${error}`);
    process.exit();
  });
};

findNearbyZipcodes(94103, 37.77, -122.41, 10);
