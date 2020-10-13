const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  body: {
    type: String
  },
  seen: {
    type: Boolean
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = message = mongoose.model('message', messageSchema);