import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sidebar from './Sidebar';

function Navbar({ cartProducts, setCartProducts,setCartNumber,cartNumber,isFeaturedClicked, isAllProductsClicke,setFeaturedClicked,setAllProductsClicked }) {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // const [cartNumber, setCartNumber] = useState(0);

  useEffect(() => {
    // Retrieve selectedProducts from local storage
    const storedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    
    // Update cartNumber based on the length of selectedProducts
    setCartNumber(storedSelectedProducts.length);
  }, []);

  const handleSidebarToggle = () => {
  setSidebarOpen(!isSidebarOpen);

  // Retrieve selectedProducts from local storage and update cart number
  const storedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  setCartNumber(storedSelectedProducts.length);
};


const handleFeaturedClick = () => {
  setFeaturedClicked(true);
  setAllProductsClicked(false); // Reset all products flag
};

const handleAllProductsClick = () => {
  setAllProductsClicked(true);
  setFeaturedClicked(false); // Reset featured products flag
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