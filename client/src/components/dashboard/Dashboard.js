import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProducts } from '../../actions/product';
import { getMyLikes } from '../../actions/like';
import { getMyFollowers, getMyFollowing } from '../../actions/follow';
import ProductItem from '../products/ProductItem';

const Dashboard = ({ 
  getMyFollowers,
  getMyFollowing,
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
      <div>
        Selling
        {products && products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      <div>
        Likes
        {likes && likes.map(like => (
          <ProductItem key={like._id} product={like} />
        ))}
      </div>
      <div>
        Followers
      </div>
      <div>
        Following
      </div>
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
  following: state.following, 
  followers: state.followers  
})

export default connect(mapStateToProps, { getMyProducts, getMyLikes, getMyFollowing, getMyFollowers })(Dashboard);