import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-right">
<img src={assets.logo} alt="" />
<p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas in repellendus dignissimos quo fugiat laudantium ducimus cum. Minus delectus, ducimus vitae sed illum, rerum voluptatum itaque ab excepturi sit modi!
</p>
<div className="footer-social-icons">
    <img src={assets.facebook_icon} alt="" />
    <img src={assets.twitter_icon} alt="" />
    <img src={assets.linkedin_icon} alt="" />
</div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
           <h2>
            Get IN TOUCH
           </h2>
           <ul>
            <li>+91-999-999-9999</li>
            <li>contact@tomato.com</li>
           </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright © 2022 Tomato. All rights reserved.
      </p>
    </div>
  )
}

export default Footer
