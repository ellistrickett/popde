import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getShop, getFollowersByShop, getFollowingByShop, getLikesByShop } from '../../actions/shop';
import { getChatName } from '../../actions/chat';
import { followUser, unfollowUser } from '../../actions/follow';
import { getProductsByShop } from '../../actions/product';
import Selling from './Selling';
import Followers from './Followers';
import Likes from './Likes';
import Following from './Following';

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
      <Selling products={products} />
      <Followers followers={followers} />
      <Following following={following} />
      <Likes likes={likes} />
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