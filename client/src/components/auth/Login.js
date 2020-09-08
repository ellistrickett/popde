import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { email, password } = formData; 

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    console.log('SUCCESS');
    }

  return ( <Fragment>
      <h1 className="header-text">LOGIN TO CONTINUE</h1>
        <form className="form" onSubmit={e => onSubmit(e)}>
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
          <input type="submit" className="btn" value="Login" />
        </form>
        <p className="or">or</p>
      <Link to="/register" className="btn">Sign up</Link>
  </Fragment>
  )
}

export default Login