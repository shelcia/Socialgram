const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  //DATE IS THE ID
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  fires: {
    type: Number,
    required: true,
  },
  fired: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  reshare: {
    type: Boolean,
    default: false,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", postSchema);
