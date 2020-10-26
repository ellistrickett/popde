import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProducts } from '../../actions/product';
import { getMyLikes } from '../../actions/like';
import { getMyFollowers, getMyFollowing } from '../../actions/follow';
import Selling from '../shop/Selling';
import Likes from '../shop/Likes';
import FollowModal from '../layout/FollowModal';

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

  const [showLikes, setShowLikes] = useState(false)
  const [displayModal, setDisplayModal] = useState(false)

  return (
    <Fragment>
      { displayModal === true ? (
        <FollowModal followers={followers} following={following} onClose={() => setDisplayModal(false)} />
      ) : null }
      <div className="positioned">
      <h1>{user && user.name}</h1>
      <p>@{user && user.username}</p>
      <button onClick={e => setDisplayModal(true)}>>Followers</button>
      <button onClick={e => setDisplayModal(true)}>Following</button>
      <button onClick={e => setShowLikes(false)}>Selling</button>
      <button onClick={e => setShowLikes(true)}>Likes</button>
      { showLikes === false ? (
        <Selling products={products} />
        ) : (
          <Likes likes={likes} />
        )}
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
  follow: state.follow, 
})

export default connect(mapStateToProps, { getMyProducts, getMyLikes, getMyFollowing, getMyFollowers })(Dashboard);