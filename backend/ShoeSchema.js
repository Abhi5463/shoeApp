const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sizesAvailable: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // You can store the image URL as a string
    required: true,
  },
});

const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;
