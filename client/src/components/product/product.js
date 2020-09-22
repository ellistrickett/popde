import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getProduct } from '../../actions/product';


const Product = ({ getProduct, product: { product, loading }, match }) => {
  useEffect(() => {
    getProduct(match.params.id);
  }, [getProduct]);

  return (
    <div>
      product
    </div>
  )
}

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  product: state.product
})

export default connect(mapStateToProps, { getProduct } )(Product)