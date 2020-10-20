import React from 'react';
import ProductItem from '../products/ProductItem';

const Likes = ({ likes }) => {

  return (
      <div>
        <div>Likes</div>
        <div>
          {likes && likes.map(like => (
          <ProductItem key={like._id} product={like} />
        ))}
        </div>
      </div>
  )
}

export default Likes;