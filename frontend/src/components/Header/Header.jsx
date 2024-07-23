import React from 'react'
import './Header.css'


const Header = ({ scrollToMenu }) => {
  
  return (
    <div className='header'>
      <div className="header-content">
        <h2>Order Your Favourite Food Here</h2>
        <p> Discover the best food & drinks from the best restaurants in your city.
            Choose from a diverse menu a delectable array of dishes crafted with the finest ingredients and culinary expertise. </p>
        <button onClick={scrollToMenu} >View Menu</button>
      </div>
    </div>
  )
}

export default Header
