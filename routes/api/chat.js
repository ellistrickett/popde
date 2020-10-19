const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator')

const Message = require('../../models/Message');

//@route   GET api/chat/:id
//@desc    Get message by room
//@access  Private

router.get('/chat/:id', auth, async (req, res) => {
  try {
    console.log(req.params.id)
    const messages = await Message.find({ chatName: req.params.id });
    

    if(!messages) {
      return res.status(404).json({ msg: 'Chat not found' })
    }

    res.json(messages)
  } catch(err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'product not found' })
    }
    res.status(500).send('Server Error')
  }
});