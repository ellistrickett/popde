const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  photo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  shipping: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  domesticShipping: {
    type: String,
    required: true
  },
  internationalShipping: {
    type: String,
    required: true
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);