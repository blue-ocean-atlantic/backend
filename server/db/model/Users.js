const mongoose = require('mongoose');

// const tempSchema = new mongoose.Schema({},{strict: false});

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    index: true,
    required: [true, 'please provide user_id'],
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    minLength: 5,
    maxLength: 5,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  biography: {
    type: String
  },
  photo_url: {
    type: String
  },
  ratings: {
    type: [Number]
  },
}, { timestamps: true });
userSchema.index({ user_id: 1 });

const Users = mongoose.model('users', userSchema);
module.exports = Users;
