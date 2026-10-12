import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";



import Home from './Pages/Home'


import Collection from './Pages/Collection'
import About from './Pages/About'
import Product from './Pages/Product'
import PlaceOrder from './Pages/PlaceOrder'
import Login from "./Pages/Login";
import Contact from './Pages/Contact'
import Navbar from './Componets/Navbar'
import Footer from './Componets/Footer';
import Cart from './Pages/Cart';
import Order from './Pages/Order';

import TrackOrder from './Pages/TrackOrder';
import Register from './Pages/Register';
import Logout from './Pages/Logout';

const App = () => {
  return (
    

    <BrowserRouter>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/cart" element={<Cart/>} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/order' element={<Order/>}/>
         <Route path="/orders/:id" element={<TrackOrder />} />
         <Route path="/register" element={<Register/>}/>
         <Route path='/logout' element={<Logout/>}/>
        </Routes>
      

        <Footer/>
      </div>
    </BrowserRouter>
    
  )
}

export default App
