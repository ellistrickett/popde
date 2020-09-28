import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getShop, getFollowersByShop, getFollowingByShop } from '../../actions/shop';
import { followUser, unfollowUser } from '../../actions/follow';
import { getProductsByShop } from '../../actions/product';
import ProductItem from '../products/ProductItem';
import ShopItem from '../shops/ShopItem';

const Shop = ({ 
  getShop,
  shop: { shop },
  getProductsByShop,
  product: { products },
  getFollowersByShop,
  getFollowingByShop,
  follow: { followers, following },
  match,
  unfollowUser,
  followUser, }) => {
  useEffect(() => {
    getShop(match.params.id);
    getProductsByShop(match.params.id);
    getFollowersByShop(match.params.id);
    getFollowingByShop(match.params.id);
  }, [getShop, getFollowersByShop, getFollowingByShop, getProductsByShop]);

  return (
    <Fragment>
      <div>
        { shop && shop.name }<br />
        @{ shop && shop.username}
      </div>
      <button onClick={e => followUser(shop._id)}>Follow</button>
      <button onClick={e => unfollowUser(shop._id)}>Unfollow</button>
      <div>
        Selling
          {products && products.map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
      </div>
      <div>
        Followers<br />
        @{followers && followers.map(follower => (
          <ShopItem key={follower._id} shop={follower} />
        ))}
      </div>
      <div>
        Following<br />
        @{following && following.map(followee => (
          <ShopItem key={followee._id} shop={followee} />
        ))}
      </div>
    </Fragment>
  )
}

Shop.propTypes = {
  getProductsByShop: PropTypes.func.isRequired,
  getShop: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
  getFollowersByShop: PropTypes.func.isRequired,
  getFollowingByShop: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  shop: state.shop,
  product: state.product,
  follow: state.follow,
})

export default connect(mapStateToProps, { getShop, followUser, unfollowUser, getProductsByShop, getFollowersByShop, getFollowingByShop })(Shop)