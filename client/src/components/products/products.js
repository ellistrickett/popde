import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductItem from './ProductItem';
import { getProducts } from '../../actions/product';

const Products = ({ getProducts, product: { products, loading }}) => {
  useEffect(() => {
    getProducts();  
  }, [getProducts]);

  return (
    <Fragment>
      <h1>Products</h1>
      <div>
        {products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </Fragment>
  )
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  product: state.product
})

export default connect(mapStateToProps, { getProducts })(Products);