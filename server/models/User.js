const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  lname: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  pronouns: {
    type: String,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  avatar: {
    type: Object,
    default: {
      avatarStyle: "circle",
      top: "longHair",
      accessories: "sunglasses",
      hairColor: "auburn",
      facialHair: "",
      clothes: "hoodie",
      eyes: "happy",
      eyebrow: "raisedExcitedNatural",
      mouth: "smile",
      skin: "darkBrown",
    },
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  bio: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
