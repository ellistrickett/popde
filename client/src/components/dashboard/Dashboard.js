import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProducts } from '../../actions/product';
import { getMyLikes } from '../../actions/like';
import { getMyFollowers, getMyFollowing } from '../../actions/follow';
import Selling from '../shop/Selling';
import Followers from '../shop/Followers';
import Likes from '../shop/Likes';
import Following from '../shop/Following';

const Dashboard = ({ 
  getMyFollowers,
  getMyFollowing,
  follow: { followers, following },
  getMyProducts, 
  product: { products }, 
  getMyLikes, 
  like: { likes }, 
  auth: { user }
}) => {
  useEffect(() => {
    getMyFollowers();
    getMyFollowing();
    getMyProducts(); 
    getMyLikes();
  }, [getMyProducts, getMyLikes, getMyFollowers, getMyFollowing]);

  return (
    <Fragment>
      <h1>{user && user.name}</h1>
      <p>@{user && user.username}</p>
      <Selling products={products} />
      <Followers followers={followers} />
      <Following following={following} />
      <Likes likes={likes} />
    </Fragment>   
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getMyProducts: PropTypes.func.isRequired,
  getMyLikes: PropTypes.func.isRequired,
  getMyFollowing: PropTypes.func.isRequired,
  getMyFollowers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product,
  like: state.like,
  follow: state.follow, 
})

export default connect(mapStateToProps, { getMyProducts, getMyLikes, getMyFollowing, getMyFollowers })(Dashboard);