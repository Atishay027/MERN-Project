import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'
const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const {url, setToken} = useContext(StoreContext)


  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChnageHandler =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...data,[name]:value})
  }
  // useEffect(()=>{console.log("userdata:",data);},[data])

  const onLogin = async (e) => {
   e.preventDefault()

   let newUrl = url;

   if(currentState==="Login"){
    newUrl += "/api/user/login"
   }
   else{
    newUrl += "/api/user/register"
   }

   const response = await axios.post(newUrl,data);

   if(response.data.success){
     setToken(response.data.token);
     localStorage.setItem("token",response.data.token);
     setShowLogin(false);
   }
   else{
    alert(response.data.message)
   }
  }



  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => {
              setShowLogin(false);
            }}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currentState === "Sign Up" ? (
            <input name="name" onChange={onChnageHandler} value={data.name} type="text" placeholder="Your name" required />
          ) : (
            <></>
          )}
          <input name="email" onChange={onChnageHandler} value={data.email} type="email" placeholder="Your email" required />
          <input name="password" onChange={onChnageHandler} value={data.password} type="password" placeholder="Your password" required />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new Account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
