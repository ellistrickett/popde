const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserLikeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  },
})

module.exports = UserLike = mongoose.model('userLike', UserLikeSchema);