import React from 'react';
import ShopItem from '../shops/ShopItem';

const Following = ({ following }) => {

  return (
    <div>
      <div>following</div>
      <div>
        @{following && following.map(followee => (
          <ShopItem key={followee._id} shop={followee} />
        ))}
      </div>
    </div>
  )
}

export default Following;