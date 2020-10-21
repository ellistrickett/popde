import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProduct } from '../../actions/product';
import { addLike, removeLike } from '../../actions/like';
import { followUser, unfollowUser } from '../../actions/follow';


const Product = ({ 
  unfollowUser,
  followUser,
  addLike, 
  removeLike,
  getProduct, 
  product: { selectedProduct, loading }, 
  match }) => {
  useEffect(() => {
    getProduct(match.params.id);
  }, [getProduct]);

  return (
    <Fragment>
      <div>
        {selectedProduct && selectedProduct.name}
      </div>
      <button onClick={e => addLike(selectedProduct._id)}>Like</button>
      <button onClick={e => removeLike(selectedProduct._id)}>Unlike</button>
      <div> 
        { loading === false ? (
          <Link to={`/users/${selectedProduct.userId}`} >
            {selectedProduct && selectedProduct.username}
          </Link> 
        ) : ( selectedProduct && selectedProduct.username )
        }
      </div>
      <button onClick={e => followUser(selectedProduct.userId)}>Follow</button>
      <button onClick={e => unfollowUser(selectedProduct.userId)}>Unfollow</button>
    </Fragment>

  )
}

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  product: state.product
})

export default connect(mapStateToProps, { getProduct, addLike, removeLike, followUser, unfollowUser } )(Product)