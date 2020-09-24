import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getProduct } from '../../actions/product';
import { addLike, removeLike } from '../../actions/like';
import { followUser } from '../../actions/follow';


const Product = ({ 
  followUser,
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
      <div>
        {product && product.username}
      </div>
      <button onClick={e => followUser(product.userId)}>Follow</button>
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

export default connect(mapStateToProps, { getProduct, addLike, removeLike, followUser } )(Product)