const mongoose = require('mongoose');
const zipcodesData = require('./zip_code_database.json');
const Zipcodes = require('../server/db/model/Zipcodes');

const url = 'mongodb://localhost:27017/blue_ocean_db';

mongoose.connect(url, {autoIndex: false}, () => {
  console.log('Database connected!')

}, e => console.log('error: ',e));

const addZipcodes = async function() {
  try {
    await Zipcodes.remove({});

    await Zipcodes.insertMany(zipcodesData);
    console.log('zipcodes loading complete!');
    process.exit();
  } catch (err) {
    console.log('something broke while loading zipcodes', err.message);
  }
}

addZipcodes();
