const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm = require("passport-local-mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/pinterestdb");

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  posts: [{
    type : Schema.Types.ObjectId,
    ref : 'Post'
  }],
  dp: {
    type: String, // You can store the URL or file path of the user's profile picture
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
});

userSchema.plugin(plm);

// Create the User model
module.exports = mongoose.model('User', userSchema);


