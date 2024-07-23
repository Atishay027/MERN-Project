import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from 'axios';
import { toast } from "react-toastify";

const Add = ({url}) => {

    const [image,setImage] = useState(false); //image geting stores in the state variable

    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })


//for  checking the details of our form is updated or not 
//     useEffect(()=>{
// console.log("data:",data);
//     },[data])

    const onChnageHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
     
        setData(data=>({...data,[name]:value}))
    }



    const onSubmitHandler = async (event)=>{
        event.preventDefault(); //using this when we submit the form the page is not reloading automatically

        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",Number(data.price));
        formData.append("category",data.category);
        formData.append("image",image);
       
        const response = await axios.post(`${url}/api/food/add`,formData);
        
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            })
            setImage(false);
            toast.success(response.data.message);
        }
        else{
            toast.error(response.data.message);
        }
    }
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image" name="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChnageHandler} value={data.name} type="text" placeholder="Enter Product Name" name="name" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea 
            onChange={onChnageHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write Content Here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select onChange={onChnageHandler} name="Category">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Dessert">Dessert</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Prize</p>
            <input onChange={onChnageHandler} value={data.price} type="number" name="price" placeholder="$20"></input>
          </div>
          
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
