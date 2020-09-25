import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getShop } from '../../actions/shop';
import { followUser, unfollowUser } from '../../actions/follow';
import { getProductsByShop } from '../../actions/product';

const Shop = ({ 
  getShop,
  shop: { shop },
  getProductsByShop,
  match,
  unfollowUser,
  followUser, }) => {
  useEffect(() => {
    getShop(match.params.id);
    getProductsByShop(match.params.id);
  }, [getShop]);

  return (
    <Fragment>
      <div>
        { shop && shop.name }<br />
        @{ shop && shop.username}
      </div>
      <button onClick={e => followUser(shop._id)}>Follow</button>
      <button onClick={e => unfollowUser(shop._id)}>Unfollow</button>
      
    </Fragment>
  )
}

Shop.propTypes = {
  getShop: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  shop: state.shop,
  product: state.product
})

export default connect(mapStateToProps, { getShop, followUser, unfollowUser, getProductsByShop })(Shop)