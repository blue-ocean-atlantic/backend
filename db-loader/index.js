const listingsData = require('./listings_mock_data.json');
// const chatroomData = require('./chatroom_mock_data.json');
// const chatMessages = require('./chat_messages_mock.json');
const ratingsData = require('./rating_mock_data.json');
const usersData = require('./users_mock_data.json');
const appointmentsData = require('./appointments.json');
const zipcodesData = require('./zipcodes.json');

const TXratingsData = require('./tx_ratings_mock_data.json');
const TXusersData = require('./tx_users_mock_data.json');
const TXlistingsData = require('./tx_listings_mock_data.json');

const {
  Users,
  Listings,
  Ratings,
  Appointments,
  Chats,
  ChatMessages,
  Zipcodes
} = require('../server/db/model');

const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/blue_ocean_db';

mongoose.connect(url, {autoIndex: false}, () => {
  console.log('Database connected!')


}, e => console.log('error: ',e))

// let schema = new mongoose.Schema({},{strict: false});

// const Listings = mongoose.model('listings', schema);
// const Chatroom = mongoose.model('chats', schema);
// const Messages = mongoose.model('chats_messages', schema);
// const Ratings = mongoose.model('ratings', schema);
// const Users = mongoose.model('users', schema);
// const Appointments = mongoose.model('appointments', schema);
// const ZipCodes = mongoose.model('zipcodes', schema);

async function addDummyData () {
  try {
    await Listings.remove({});
    // await Chatroom.remove({});
    // await Messages.remove({});
    await Ratings.remove({});
    await Users.remove({});
    await Appointments.remove({});
    await Zipcodes.remove({});

    await Listings.insertMany(listingsData);
    // await Chatroom.insertMany(chatroomData);
    // await Messages.insertMany(chatMessages);
    await Ratings.insertMany(ratingsData);
    await Users.insertMany(usersData);
    await Appointments.insertMany(appointmentsData);
    await Zipcodes.insertMany(zipcodesData);

    await Users.insertMany(TXusersData);
    await Listings.insertMany(TXlistingsData);
    await Ratings.insertMany(TXratingsData);

    const userRatings = {};

    ratingsData.forEach((rating) => {
      if (userRatings[rating.rated_for]) {
        userRatings[rating.rated_for].push(rating.rating);
      } else {
        userRatings[rating.rated_for] = [rating.rating];
      }
    });

    TXratingsData.forEach((rating) => {
      if (userRatings[rating.rated_for]) {
        userRatings[rating.rated_for].push(rating.rating);
      } else {
        userRatings[rating.rated_for] = [rating.rating];
      }
    });

    const loadUserRatingsPromises = [];

    for (const user_id in userRatings) {
      loadUserRatingsPromises.push(Users.findOneAndUpdate({user_id}, {ratings: userRatings[user_id]}).exec());
    }

    await Promise.all(loadUserRatingsPromises);

    // console.log(userRatings);

    console.log('data loading complete!');
    process.exit();
  } catch (err) {
    console.log('something broke while loading data', err.message);
  }
}

addDummyData();
