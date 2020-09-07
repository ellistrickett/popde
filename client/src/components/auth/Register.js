import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData; 

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else { console.log('SUCCESS');
    }
  }
  
  return ( <Fragment>
    <div className="auth">
    <h1 className="header-text">SIGN UP TO CONTINUE</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e) }
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn" value="Register" />
      </form>
      <p className="or">or</p>
      <Link to="/login">Sign In</Link>
    </div>
  </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Register);