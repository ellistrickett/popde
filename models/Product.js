const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  userId: {
    type: String
  },
  userName: {
    type: String
  },
  username: {
    type: String
  },
  name: {
    type: String,
    required: true
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
  shipping: {
    type: String,
    required: true
  },
  shippingPrice: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ]
});

module.exports = Product = mongoose.model('product', ProductSchema);