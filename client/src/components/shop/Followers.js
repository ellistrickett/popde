import React from 'react';
import ShopItem from '../shops/ShopItem';

const Followers = ({ followers }) => {

  return (
    <div>
      <div>Followers</div>
      <div>
        @{followers && followers.map(follower => (
          <ShopItem key={follower._id} shop={follower} />
        ))}
      </div>
    </div>
  )
}

export default Followers;