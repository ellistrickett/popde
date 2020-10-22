import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { followUser } from '../../actions/follow';

const ShopItem = ({ auth, shop: { _id, name, username }  }) => {
  return (
    <Fragment>
        <Link to={`/users/${_id}`} className="shop_details" >
          <div className="shop_name">
            { name }
          </div>
          <p className="shop_usename">
            {username}
          </p>
        </Link>
        <button onClick={e => followUser(_id)} className="follow_button">Follow</button>
    </Fragment>
  )
}

ShopItem.propTypes = {
  shop: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(ShopItem)