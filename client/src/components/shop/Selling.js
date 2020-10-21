import React from 'react';
import ProductItem from '../products/ProductItem';

const Selling = ({ products }) => {

  return (
    <div>
      <div>
        {products && products.map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
      </div>
    </div>
  )
}

export default Selling;