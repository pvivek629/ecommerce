import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sidebar from './Sidebar';

function Navbar({ cartProducts, setCartProducts,setCartNumber,cartNumber,isFeaturedClicked, isAllProductsClicke,setFeaturedClicked,setAllProductsClicked }) {

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    setCartNumber(storedSelectedProducts.length);
  }, []);

  const handleSidebarToggle = () => {
  setSidebarOpen(!isSidebarOpen);
  const storedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  setCartNumber(storedSelectedProducts.length);
};


const handleFeaturedClick = () => {
  setFeaturedClicked(true);
  setAllProductsClicked(false);
};

const handleAllProductsClick = () => {
  setAllProductsClicked(true);
  setFeaturedClicked(false);
};

  return (
    <div className='navbar'>
      <div className='navbarheader'>
        <div className="logo">
          <p className='footername'>RIGHT<span className='footercom'>FIT.COM</span></p>

        </div>
        <div className="navbardetail">
        <p className="allproduct" onClick={handleAllProductsClick}>All Products</p>
        <p className="featured" onClick={handleFeaturedClick}>Featured Products</p>
          <div className='shoppingcart'>
          <ShoppingCartIcon className='carticon' onClick={handleSidebarToggle} />
          {cartNumber ? <b className='cartnumber'>{cartNumber}</b> : ''}
        </div>
          <Sidebar setCartNumber={setCartNumber} cartProducts={cartProducts}  setCartProducts={setCartProducts} isOpen={isSidebarOpen} onClose={handleSidebarToggle} />

        </div>
      </div>
    </div>
  )
}

export default Navbar;