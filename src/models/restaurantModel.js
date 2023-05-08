const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  facebook: {
    type: String,
  },
  numTel: {
    type: String,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);