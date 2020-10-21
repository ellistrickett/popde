import React from 'react';
import ReactDOM from 'react-dom';
import Followers from '../shop/Followers';
import Following from '../shop/Following';

const FollowModal = ({ followers, following }) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-body">
      <Followers followers={followers} />
      <Following following={following} />
      </div>
    </div>,
    document.querySelector('#modal')
  )
};

export default FollowModal;