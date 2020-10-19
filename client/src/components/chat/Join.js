import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Join = ({ auth: { user }, shop: { username } }) => {

  return (
    <Fragment>
      <div>

      </div>
    </Fragment>
  )
}

Join.propTypes = {
  shop: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  shop: state.shop
})

export default connect(mapStateToProps, {})(Join)