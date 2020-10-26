import React from 'react';
import ShopItem from '../shops/ShopItem';

const Followers = ({ followers, onClose }) => {

  return (
    <div>
      <div>Followers</div>
      <div className="shop_item">
        {followers && followers.map(follower => (
          <ShopItem key={follower._id} shop={follower} />
        ))}
      </div>
    </div>
  )
}

export default Followers;