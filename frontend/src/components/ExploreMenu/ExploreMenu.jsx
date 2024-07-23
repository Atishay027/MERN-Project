import React from 'react'
import './ExploreMenu.css' 
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory,menuRef}) => {
   
     
  return (
    <div ref={menuRef}>
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our Menu</h1>
            <p className='explore-menu-text'>
            Choose from a diverse menu a delectable array of dishes crafted with the finest ingredients and culinary expertise.
            Our mission is to satify your cravings and elevate your dining experience, one delicious meal at a time.
            </p>
            <div className="explore-menu-list">
                {
                    menu_list.map((item, index) => {
                        return (
                            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                                   <img className={category===item.menu_name?"active":""} src={item.menu_image}/>
                                   <p>{item.menu_name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <hr></hr>
        </div>
      
    </div>
  )
}

export default ExploreMenu
