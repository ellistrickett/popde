const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')

const Product = require('../../models/product');

//@route   post api/products/create
//@desc    create a product
//@access  Private

// router.post('/create', [auth, [
//   check('name', 'Name is required').not().isEmpty(),
//   check('photo', 'Photo is required').not().isEmpty(),
//   check('description', 'Description is required').not().isEmpty(),
//   check('category', 'Category is required').not().isEmpty(),
//   check('location', 'Location is required').not().isEmpty(),
//   check('shipping', 'Shipping is required').not().isEmpty(),
//   check('price', 'Price is required').not().isEmpty(),
//   check('domesticShipping', 'Domestic Shipping is required').not().isEmpty(),
//   check('internationalShipping', 'International Shipping is required').not().isEmpty(),
// ] ], (req, res) => {
//   const errors = validationResult(req);
//   if(!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }
// });


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