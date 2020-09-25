const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator')


const Product = require('../../models/Product');
const User = require('../../models/User');
const UserLike = require('../../models/UserLike');

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

//@route   GET api/products/my
//@desc    Get all products by user
//@access  Public

router.get('/my', auth, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id }).sort({ date: -1 })
    res.json(products)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});


//@route   GET api/products/:id
//@desc    Get product by product ID
//@access  Public

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if(!product) {
      return res.status(404).json({ msg: 'Product not found' })
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
    const userLike = await UserLike.find({ user: req.user.id, product: req.params.id })
    console.log(userLike)
    
    // Check if the product has already been liked
    if(userLike.length > 0) {
      return res.status(400).json({ msg: 'Product already liked' });
    }

    const newUserLike = new UserLike({
      user: req.user.id,
      product: req.params.id
    })

    const result = await newUserLike.save();

    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

//@route   PUT api/products/unlike/:id
//@desc    Unike a product
//@access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const userLike = await UserLike.find({ user: req.user.id, product: req.params.id })
    
    // Check if the product has already been liked
    if(userLike.length === 0) {
      return res.status(400).json({ msg: 'Product hasnt been liked' });
    }
    await UserLike.findOneAndRemove({ user: req.user.id, product: req.params.id })

    res.json({ msg: 'Product Unliked' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

//@route   GET api/products/my
//@desc    Get all products liked by a user
//@access  Private

router.get('/my/likes', auth, async (req, res) => {
  try {
    const likes = await UserLike.find({ user: req.user.id }).sort({ date: -1 })
    const result = await Product.find({ _id: likes.map(like => (like.product)) })
    res.json(result)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

module.exports = router;