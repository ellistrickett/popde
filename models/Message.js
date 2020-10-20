const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chatName: {
    type: String
  },
  body: {
    type: String
  },
  seen: {
    type: Boolean
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  sender: {
    type: String
  },
  recipient: {
    type: String
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = message = mongoose.model('message', messageSchema);