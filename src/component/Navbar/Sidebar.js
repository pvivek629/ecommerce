// Sidebar.js

import React from 'react';

const Sidebar = ({ isOpen, onClose, selectedProducts, onRemoveFromCart }) => {
    console.log(selectedProducts,"hh")
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2>Selected Products</h2>
      {/* <ul>
        {selectedProducts.map((selectedProduct, index) => (
          <li key={index}>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <p>Name: {selectedProduct.name}</p>
            <p>Color: {selectedProduct.color}</p>
            <p>Material: {selectedProduct.material}</p>
            <p>Price: INR {selectedProduct.price}</p>
            <button onClick={() => onRemoveFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul> */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Sidebar;
