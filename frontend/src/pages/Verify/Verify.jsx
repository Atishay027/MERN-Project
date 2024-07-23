import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    console.log("orderId:",orderId);
    console.log("Success:",success);

    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async()=>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId})
       console.log("res of payment:",response);
        if(response.data.success){
            navigate("/myorders");
            console.log("payment paid");
        }else{
            navigate("/");
            console.log("payment not paid ");
        }
    }

    useEffect(()=>
        {verifyPayment();

    },[])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify;
