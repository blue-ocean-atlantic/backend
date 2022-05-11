const { Listings } = require('../model');

const searchListings = (zipCode, res) => {
  console.log('we made it fams');
}

const getLandingListings = (req,res) => {
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

module.exports = {
  searchListings,
  getLandingListings
}