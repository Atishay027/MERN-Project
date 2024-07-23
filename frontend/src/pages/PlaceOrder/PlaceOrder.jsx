import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,url,cartItems} = useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    address:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })
  const onChangeHandler= (event)=>{
    const name= event.target.name;
    const value= event.target.value;
    setData({...data,[name]:value})
  }

  // useEffect(()=>{console.log("data:",data);},[data])

  const placeOrder = async (event)=>{
    event.preventDefault();
    let orderItems = []
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    console.log("ordrItem:",orderItems);
    let orderData = {
      address:data,
      items: orderItems,
      amount: getTotalCartAmount()+20,
    }
    let response = await axios.post(url+'/api/order/place',orderData,{headers:{token}});

    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error")
    }
    
  }

  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
         navigate("/cart")
    }else if(getTotalCartAmount()===0){
      navigate("/cart")
    }
  },[token])
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input  required onChange={onChangeHandler} name="firstName" value={data.firstName} type="text" placeholder="First Name" />
          <input required onChange={onChangeHandler} name="lastName" value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input  required onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder="Email Address" />
        <input required onChange={onChangeHandler} name="street" value={data.street}  type="text" placeholder="Street" />
        <div className="multi-fields">
          <input  required onChange={onChangeHandler} name="city" value={data.city}  type="text" placeholder="City" />
          <input  required onChange={onChangeHandler} name="state" value={data.state}  type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input  required onChange={onChangeHandler} name="zipcode" value={data.zipcode}  type="text" placeholder='Zip code'/>
          <input  required onChange={onChangeHandler} name="country" value={data.country}  type="text" placeholder='Country'/>
</div>
<input type="text" required onChange={onChangeHandler} name="phone" value={data.phone}  placeholder='Phone'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:20}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+20}</p>
            </div>
           
          </div>
          <button type="submit" >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
