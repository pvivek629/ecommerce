import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sidebar from './Sidebar';



function Navbar({ cartProducts, setCartProducts }) {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [cartLength, setCartLength] = useState(cartProducts.length);
  useEffect(() => {
    setCartLength(cartProducts.length);
  }, [cartProducts])

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='navbar'>
      <div className='navbarheader'>
        <div className="logo">
          <p className='footername'>RIGHT<span className='footercom'>FIT.COM</span></p>

        </div>
        <div className="navbardetail">
          <p className="allproduct">All Products</p>
          <p className="featured">Featured Products</p>
          <div className='shoppingcart'>
            <ShoppingCartIcon className='carticon' onClick={handleSidebarToggle} />{cartLength ? <b className='cartnumber' >{cartLength}</b> : ''}
          </div>
          <Sidebar cartProducts={cartProducts} setCartProducts={setCartProducts} isOpen={isSidebarOpen} onClose={handleSidebarToggle} setCartLength={setCartLength} />
        </div>
      </div>
    </div>
  )
}

export default Navbar;