const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the post schema
const postSchema = new Schema({
  postText: {
    type: String,
    required: true,
  },
  user : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
});

// Create the Post model
module.exports = mongoose.model('Post', postSchema);


