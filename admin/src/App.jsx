import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Order from './Pages/Orders/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'


const App = () => {
  const url ="https://mern-project-backend-y6i5.onrender.com";
  return (
    <div className='heading'>
      <ToastContainer />
      <Navbar/>
      <hr/>
      <h1>Welcome to the Tomato Food Delivery Admin Panel. This site is exclusively for restaurant owners and small food businesses to add food items, remove food items, and update the status of food processing.</h1>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add/>} url={url}/>
          <Route path='/list' element={<List/>} />
          <Route path='/orders' element={<Order/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
