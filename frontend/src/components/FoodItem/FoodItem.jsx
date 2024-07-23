import React, { useContext} from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({id,name,price,description,image}) => {

  // const [itemCount,setItemCount] =useState(0);

  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
 
  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        {/* In src we use url/images/image-name for src={url+"/images/"+image} loading the image in frontend form backend; when we open the image in the new tab it open and show url of like this "http://localhost:4000/images/1721249566281food_1.png"  */}
        <img className='food-item-image' src={url+"/images/"+image} alt="" />
        {
          
          // !itemCount ; first we use useState but cart item is used everywhere so we declare in the storecontext and use with help of useContext
          !cartItems[id] 
          ?<img src={assets.add_icon_white} className='add' onClick={()=>addToCart(id)} alt="" />
              : <div className="food-item-counter">
                   <img onClick={()=>removeFromCart(id)}src={assets.remove_icon_red}/>
                   <p>{cartItems[id]}</p>
                   <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>
                {name}
            </p>
            <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">
                {description}
            </p>
            <p className="food-item-price">
                ${price}
            </p>
       
      </div>
    </div>
  )
}

export default FoodItem
