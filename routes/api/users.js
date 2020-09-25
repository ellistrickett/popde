const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Product = require('../../models/Product');

//@route   POST api/users
//@desc    Register user
//@access  Public

router.post('/', [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('username', 'Please enter a username')    
    .not()
    .isEmpty(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    
    const { name, email, username, password } = req.body;

    try {
    // See if the email exists
    let user = await User.findOne({ email });

    if(user) {
      return res.status(400).json({ errors: [{ msg: 'Email has already been used' }] });
    }

    // See if username exists
    let user2 = await User.findOne({ username });

    if(user2) {
      return res.status(400).json({ errors: [{ msg: 'Username already exists' }] });
    }

    // Get users gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })

    user = new User({
      name,
      email,
      username,
      avatar,
      password
    });

    // Encrypt password

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 }, 
      (err, token) => {
      if(err) throw err;
      res.json({ token });
    });

    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route   PUT api/users/follow
//@desc    Follow a user
//@access  Private

router.put('/follow/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const userToBeFollowed = await User.findById(req.params.id)

    if(user === userToBeFollowed) {
      return res.status(400).json({ msg : "You cannot follow yourself"})
    } 

    if(userToBeFollowed.followers.filter(follower => follower.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg : "You already follow this user"})
    }

    userToBeFollowed.followers.unshift({ user: req.user.id })
    userToBeFollowed.save()

    user.following.unshift({ user: req.params.id});
    user.save()
    res.json(user)

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

//@route   PUT api/users/follow
//@desc    Unfollow a user
//@access  Private

router.put('/unfollow/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const userToBeUnfollowed = await User.findById(req.params.id)

    if(user === userToBeUnfollowed) {
      return res.status(400).json({ msg : "You cannot unfollow yourself"})
    } 

    if(userToBeUnfollowed.followers.filter(follower => follower.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg : "You dont follow this person"})
    }

    userToBeUnfollowed.followers.splice(userToBeUnfollowed.followers.findIndex(follower => follower.user === req.user.id), 1)
    userToBeUnfollowed.save()

    user.following.splice(user.following.findIndex(followee => followee.user === req.params.id), 1)
    user.save()

    res.json(user)

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

//@route   GET api/users/my/following
//@desc    Get users who the user is following
//@access  Private

router.get('/my/following', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const result = await User.find({ _id: user.following.map(followee => (followee.user)) })
    res.json(result)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

//@route   GET api/users/my/followers
//@desc    Get all users followers
//@access  Private

router.get('/my/followers', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const result = await User.find({ _id: user.followers.map(follower => (follower.user)) })
    res.json(result)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

//@route   GET api/users/:id
//@desc    Get a specific user
//@access  Public

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

module.exports = router;