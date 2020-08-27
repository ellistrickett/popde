const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator')


const Product = require('../../models/Product');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route   POST api/products
//@desc    create a product
//@access  Private

router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('photo', 'Photo is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty(),
  check('shipping', 'Shipping is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('shipping', 'Shipping details is required').not().isEmpty(),
  check('shippingPrice', 'Shipping Price is required').not().isEmpty()
] ], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newProduct = new Product({
      
      name: req.body.name,
      photo: req.body.photo,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      shipping: req.body.shipping,
      price: req.body.price,
      shipping: req.body.shipping,
      shippingPrice: req.body.shippingPrice,
      userName: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const product = await newProduct.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


//@route   GET api/products
//@desc    Get all products
//@access  Public

router.get('/', async (req, res) => {
  try {
    const products = await Product.find(). populate('product', ['photo', 'description', 'price']);
    res.json(products)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});


module.exports = router;