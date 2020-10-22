import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Followers from '../shop/Followers';
import Following from '../shop/Following';

const FollowModal = ({ followers, following, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
      <Followers followers={followers} />
      <Following following={following} />
      </div>
    </div>,
    document.querySelector('#modal')
  )
};

const mapStateToProps = state => ({
  shop: state.shop,
})

export default connect(mapStateToProps, null)(FollowModal);