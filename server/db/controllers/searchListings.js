const { Listings } = require('../model');

const searchListings = (zipCode, res) => {
  console.log('we made it fams');
}

const getLandingListings = () => {
  // let listingData = Listings.find({}).then((data)=>{return data});
  // return listingData;
  return Listings.aggregate([
    { $lookup:
        {
           from: "users",
           localField: "created_by",
           foreignField: "user_id",
           as: "created_by"
        }
    }
])
}

const setNewListing = (newListing) => {
  return new Listings(newListing);
}

module.exports = {
  searchListings,
  getLandingListings,
  setNewListing
}