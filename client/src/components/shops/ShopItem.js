import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ShopItem = ({ auth, shop: { _id, name, username }  }) => {
  return (
    <Fragment>
      <div>
        <Link to={`/users/${_id}`} >
          { name }<br />{username}
        </Link>
      </div>
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