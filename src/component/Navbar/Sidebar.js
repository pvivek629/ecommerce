import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({ isOpen, onClose, cartProducts, setCartProducts,setCartNumber }) => {

  const [finalProducts, setFinalProducts] = useState(cartProducts);

  useEffect(() => {
    const storedSelectedProducts = localStorage.getItem('selectedProducts');
    if (storedSelectedProducts) {
      setFinalProducts(JSON.parse(storedSelectedProducts));
    }
  }, [cartProducts]);

  const onRemoveFromCart = (indexSelected) => {
    setCartProducts(finalProducts.filter((val, index) => index !== indexSelected));
    const updatedSelectedProducts = [...finalProducts];
    updatedSelectedProducts.splice(indexSelected, 1);
    setFinalProducts(updatedSelectedProducts);
    localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
    setCartNumber(prevCartNumber => prevCartNumber - 1);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <CloseIcon className='closeicon' onClick={onClose} />
      <h2 className='shoppingheader'>Shopping Cart</h2>
      <ul className='sidebardata'>
        {finalProducts && finalProducts.map((selectedProduct, index) => (
          <li key={index}>
            <div className='sidebardiv'>
              <div>
                <img className='sidebarimage' src={selectedProduct.image} alt={selectedProduct.name} width={100} height={100} />
              </div>
              <div className='sidebardatadiv'>
                <p className='sideheadername'>{selectedProduct.name}</p>
                <div className='sidebarlist'>
                  <p className='sidebarcolorlist'>{selectedProduct.color}</p>
                  <p className='sidebarmateriallist'>{selectedProduct.material}</p>
                </div>
                <p className='sidebarmoney'>INR {selectedProduct.price}</p>
                <button onClick={() => onRemoveFromCart(index)} className='sidebarremove'>Remove</button>
              </div>
            </div>


          </li>
        ))}
      </ul>

    </div>
  );
};

export default Sidebar;
