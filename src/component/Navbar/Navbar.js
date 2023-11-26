// Navbar.js

import React, { useState } from 'react';
import "./Navbar.css";
import logo from "../image/logo.png";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sidebar from './Sidebar';



function Navbar({ selectedProducts,onRemoveFromCart }) {

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  console.log(selectedProducts)

  return (
    <div className='navbar'>
        <div className='navbarheader'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="navbardetail">
              <p className="allproduct">All Products</p>
              <p className="featured">Featured Products</p>
              <ShoppingCartIcon className='carticon' onClick={handleSidebarToggle}/>
              <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} selectedProducts={selectedProducts} onRemoveFromCart={onRemoveFromCart} />
            </div>
        </div>
    </div>
  )
}

export default Navbar;