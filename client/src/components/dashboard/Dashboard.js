import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProducts } from '../../actions/product';
import ProductItem from '../products/ProductItem';

const Dashboard = ({ getMyProducts, product: { products }, auth: { user } }) => {
  useEffect(() => {
    getMyProducts();  
  }, [getMyProducts]);

  return (
    <Fragment>
      <h1>{user && user.name}</h1>
      <p>@{user && user.username}</p>
      <div>
        {products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </Fragment>   
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getMyProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product
})

export default connect(mapStateToProps, { getMyProducts })(Dashboard);