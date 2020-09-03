import React from 'react'
import { Link } from 'react-router-dom';
import appLogo from '../../img/download-app-android.png';

const Landing = () => {
  return (
    <div className="bck-image">
      <div className="welcome-text">
        BUY. SELL.<br />DISCOVER UNIQUE FASHION.
      </div>
      <div className="welcome-text-p">
        Designer. Preloved. Vintage. Streetwear. Sneakers.<br />Whatever your style. Find it on Depop.
      </div>
      <div className="app-logo">
        <img src={appLogo} alt="appLogo" className="app-logo"/>
      </div>
    </div>
  )
}

export default Landing;