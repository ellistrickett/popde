import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getShop, getFollowersByShop, getFollowingByShop, getLikesByShop } from '../../actions/shop';
import { getChatName } from '../../actions/chat';
import { followUser, unfollowUser } from '../../actions/follow';
import { getProductsByShop } from '../../actions/product';
import ProductItem from '../products/ProductItem';
import ShopItem from '../shops/ShopItem';

const Shop = ({ 
  auth: { user },
  getShop,
  shop: { shop },
  getProductsByShop,
  product: { products },
  getFollowersByShop,
  getFollowingByShop,
  follow: { followers, following },
  getLikesByShop,
  like: { likes },
  match,
  unfollowUser,
  getChatName,
  chat: { chatName },
  followUser }) => {

  useEffect(() => {
    getShop(match.params.id);
    getProductsByShop(match.params.id);
    getFollowersByShop(match.params.id);
    getFollowingByShop(match.params.id);
    getLikesByShop(match.params.id);
    getChatName(match.params.id, user)
  }, [getShop, getFollowersByShop, getFollowingByShop, getProductsByShop, getChatName]);

  return (
    <Fragment>
      <div>
        { shop && shop.name }<br />
        @{ shop && shop.username}
      </div>
      <button onClick={e => followUser(shop._id)}>Follow</button>
      <button onClick={e => unfollowUser(shop._id)}>Unfollow</button>
      <Link to={`/chat/${chatName}`} >
          <div>
            <ion-icon name="mail-outline"></ion-icon>
          </div>
      </Link>
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
      <div>
        Likes
        {likes && likes.map(like => (
          <ProductItem key={like._id} product={like} />
        ))}
      </div>
    </Fragment>
  )
}

Shop.propTypes = {
  getChatName: PropTypes.func.isRequired,
  getProductsByShop: PropTypes.func.isRequired,
  getShop: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
  getFollowersByShop: PropTypes.func.isRequired,
  getFollowingByShop: PropTypes.func.isRequired,
  getLikesByShop: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  shop: state.shop,
  product: state.product,
  follow: state.follow,
  like: state.like,
  chat: state.chat
})

export default connect(mapStateToProps, { getShop, followUser, unfollowUser, getProductsByShop, getFollowersByShop, getFollowingByShop, getLikesByShop, getChatName })(Shop)