const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  description: {
    type: String,
    required: true
  },
  selling: [{
    products: {
      type: Schema.Types.ObjectId, 
      ref: 'product'
    }
  }]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);