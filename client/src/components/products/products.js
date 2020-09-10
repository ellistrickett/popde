import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/product';

const Products = ({ getProducts, product: { products, loading }}) => {
  useEffect(() => {
    getProducts();  
  }, [getProducts]);

  return (
    <div>

    </div>
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