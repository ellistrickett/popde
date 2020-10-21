import React from 'react';
import ReactDOM from 'react-dom';

const FollowModal = props => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-body">
        yfgyufvhvjgjhb
      </div>
    </div>,
    document.querySelector('#modal')
  )
};

export default FollowModal;