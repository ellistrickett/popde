import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getProduct } from '../../actions/product';
import { addLike, removeLike } from '../../actions/product';


const Product = ({ 
  addLike, 
  removeLike,
  getProduct, 
  product: { product }, 
  match }) => {
  useEffect(() => {
    getProduct(match.params.id);
  }, [getProduct]);

  return (
    <Fragment>
      <div>
        product
      </div>
      <button onClick={e => addLike(product._id)}>Like</button>
      <button onClick={e => removeLike(product._id)}>Unlike</button>
    </Fragment>

  )
}

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  product: state.product
})

export default connect(mapStateToProps, { getProduct, addLike, removeLike } )(Product)