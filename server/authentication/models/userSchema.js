const mongoose = require('mongoose');

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

  salt: {
    type: String,
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
    type: String,
    minLength: 5,
    maxLength: 5,
    required: true
    // type: Number,
    // min: 501,
    // max: 99950,
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
  }
});
const CreateUserSchema = mongoose.model('Users', userSchema);

module.exports = CreateUserSchema;