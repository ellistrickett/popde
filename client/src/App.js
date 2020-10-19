import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './css/App.css';
import './css/grid.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Products from './components/products/products';
import Product from './components/product/product';
import Shop from './components/shop/Shop';
import Chat from './components/chat/Chat';
import CreateProduct from './components/product-form/CreateProduct';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/search" component={Products} />
          <PrivateRoute exact path="/products/create" component={CreateProduct} />
          <Route exact path="/product/:id" component={Product} />
          <Route exact path="/users/:id" component={Shop} />
          <Route exact path="/chat/:room" component={Chat} />
        </Switch>
      </section>
    </Fragment>
  </Router>
  </Provider>
)};

export default App;
