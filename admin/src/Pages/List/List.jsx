import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const url = "https://mern-project-backend-y6i5.onrender.com";
  const fetchList = async () => {
    const res = await axios.get(`${url}/api/food/foodlist`);
    console.log("response:", res.data);
    if (res.data.success) {
      setList(res.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId)=>{
      console.log("Id:",foodId);
      const res = await axios.post(`${url}/api/food/remove`,{id:foodId});

      await fetchList();

      if(res.data.success){
        toast.success(res.data.message);
      }
      else{
        toast.error("Error");
      }
  }
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/` + item.image}></img>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className="cursor" >x</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default List;
