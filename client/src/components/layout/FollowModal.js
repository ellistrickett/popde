import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Followers from '../shop/Followers';
import Following from '../shop/Following';

const FollowModal = ({ followers, following, onClose }) => {

  return ReactDOM.createPortal(
    <div className="modal" >
      <div className="modal-body">
        <div className="modal-links" onClick={onClose}>
          <ion-icon name="close-circle-outline"></ion-icon>
          <Followers followers={followers} />
          <Following following={following} />
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  )
};

const mapStateToProps = state => ({
  shop: state.shop,
})

export default connect(mapStateToProps, null)(FollowModal);