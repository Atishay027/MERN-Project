import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const url = 'http://localhost:4000' 
   const [token,setToken] = useState("");
   const [food_list,setFoodList] = useState([])

   const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      //This statement for when their is not item in cart; first add item in the cart
      setCartItems((prev) => ({ ...prev, [itemId]: 1 })); //new entry for our food product
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 })); //If item is already present in the cart item then it will increase the cart item
    }

    //update the cartItem when we add item in cartItem that we stored in our user database
    if(token){
      await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 })); //Decrease the value of item by 1

    if(token){ //if we had token that user is loged in
      await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) 
      {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) =>  product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        };
      }
    
    return totalAmount;
  };

   const fetchFoodList = async ()=>{
    const response = await axios.get(url+"/api/food/foodlist");
    setFoodList(response.data.data);
   }


  //when we add some item and then we load the page the data will gone using this, we get the data that stored in our cart user database
  const loadCartData = async (token)=>{
    const response = await axios.post(url+'/api/cart/get',{},{headers:{token}});
    setCartItems(response.data.cartData);
    console.log("res:",response.data.cartData);
  }



   useEffect(()=>{
    async function loadData(){
      await fetchFoodList();  //whenever the page is laoded our foodlist will be loaded but without image
      //If token entry is their then we set the token in local storage
     if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token")) //When we reload the page we are logout; so solve this problem using this

       //when the page is loaded the cart item is not gone
       //so we are fetching the cart item from the backend
      // await loadCartData(localStorage.getItem("token"));
       }
    }
    loadData(); //Call the function
  },[])

 

  

  

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };




  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
