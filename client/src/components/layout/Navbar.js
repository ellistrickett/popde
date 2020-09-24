import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import depopLogo from'../../img/depop_logo.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <div>
      <Link to="/" onClick={logout} className="logout">Logout</Link>
      <Link to ="/products/create" className="sell">Sell</Link>
      <Link to ="/search" className="search">Search</Link>
      <Link to ="/dashboard" className="dashboard">Your Profile</Link>
    </div>
  );

  const guestLinks = (
    <Link to="/login" className="login">Login</Link>
  );

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={depopLogo} alt="depopLogo" className="logo"/>
      </Link>
      <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);