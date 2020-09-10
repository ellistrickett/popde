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
      userId: req.user.id,
      userName: user.name,
      username: user.username,
      name: req.body.name,
      photo: req.body.photo,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      shipping: req.body.shipping,
      price: req.body.price,
      shipping: req.body.shipping,
      shippingPrice: req.body.shippingPrice
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
    const products = await Product.find().sort({ date: -1 })
    res.json(products)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

//@route   GET api/products/:id
//@desc    Get product by ID
//@access  Public

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if(!product) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.json(product)
  } catch(err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'product not found' })
    }
    res.status(500).send('Server Error')
  }
});

//@route   DELETE api/products/:id
//@desc    Delete a product
//@access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if(!product) {
      return res.status(404).json({ msg: 'Product not found' })
    }

    // Check user
    if(product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not Authorized'})
    }

    await product.remove();
  

    res.json({ msg: 'Product removed'});
  } catch(err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' })
    }
    res.status(500).send('Server Error')
  }
});

//@route   PUT api/products/like/:id
//@desc    Like a product
//@access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    // Check if the has already been liked
    if(product.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Product already liked' });
    }
    product.likes.unshift({ user: req.user.id });

    await product.save();

    res.json(product.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

//@route   PUT api/products/unlike/:id
//@desc    Like a product
//@access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    // Check if the has already been liked
    if(product.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Product has not yet liked' });
    }
    // Get remove index
    const removeIndex = product.likes.map(like => like.user.toString()).indexOf(req.user.id);

    product.likes.splice(removeIndex, 1)

    await product.save();

    res.json(product.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;