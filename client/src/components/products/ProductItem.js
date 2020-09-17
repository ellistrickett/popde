import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ProductItem = ({ auth, product: { _id, photo, price }}) => {
  return (
    <div>
      <img className='product-photo' src={photo} alt='' />
      <p>{_id}</p>
      <p>{price}</p>
    </div>
  )
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(ProductItem)