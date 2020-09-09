const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route   GET api/profile/me
//@desc    Get current users profile
//@access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'username']);

    if(!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route   POST api/profile/
//@desc    Create or update a user profile
//@access  Private
router.post('/', [ auth, [ check('description', 'Description is required').not().isEmpty()] ], async (req, res) => {
  const error = validationResult(req);
    if(!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { description } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(description) profileFields.description = description;
    
    try { 
      let profile = await Profile.findOne({ user: req.user.id });

      if(profile) {
        // Update
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();

      res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'username']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 