// Product.js

import React, { useState, useEffect } from 'react';
import "./Product.css";

const Product = ({ onAddToCart,setCartProducts,setCartNumber,isAllProductsClicked,isFeaturedClicked}) => {
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const productsPerPage = 6; // Number of products to display per page

    useEffect(() => {
        // Fetch colors data
        fetch('https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/colors', {
            headers: {
                Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo',
            },
        })
            .then(response => response.json())
            .then(data => setColors(data.colors || []));

        // Fetch materials data
        fetch('https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/material', {
            headers: {
                Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo',
            },
        })
            .then(response => response.json())
            .then(data => setMaterials(data.material));

        // Fetch all products initially
        fetch('https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/products', {
            headers: {
                Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo',
            },
        })
            .then(response => response.json())
            .then(data => setProducts(data.products || []));
    }, []);

    useEffect(() => {
        // Fetch all products initially or fetch only featured products based on isFeaturedClicked
        const apiUrl = isAllProductsClicked
          ? 'https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/products'
          : 'https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/featured';
    
        fetch(apiUrl, {
          headers: {
            Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo',
          },
        })
          .then(response => response.json())
          .then(data => setProducts(data.products || []));
      }, [isFeaturedClicked, isAllProductsClicked]);

    const handleColorClick = (colorId) => {
        setSelectedColor(colorId);
        setSelectedMaterial('');
        setCurrentPage(1); // Reset to the first page when color is clicked
        setHoveredProductId(null);
    };

    const handleMaterialClick = (materialId) => {
        setSelectedMaterial(materialId);
        setSelectedColor('');
        setCurrentPage(1); // Reset to the first page when material is clicked
        setHoveredProductId(null);
    };

    const handleProductClick = (productId) => {
        const clickedProduct = products.find(product => product.id === productId);
      
        // Update selectedProducts state and local storage
        setSelectedProducts(prevSelectedProducts => [...prevSelectedProducts, clickedProduct]);
      
        // Retrieve existing data from local storage
        const storedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
      
        // Merge existing data with new data and save to local storage
        const updatedSelectedProducts = [...storedSelectedProducts, clickedProduct];
        localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
      
        // Add the clicked product to the cart
        setCartProducts(prevProducts => [...prevProducts, clickedProduct]);
      
        // Show the sidebar
        setSidebarVisible(true);
      
        // Update the cart number in the Navbar
        setCartNumber(prevCartNumber => prevCartNumber + 1);
      };
      
    
    
    
    

    const handleRemoveClick = (index) => {
        setSelectedProducts(prevProducts => prevProducts.filter((_, i) => i !== index));
    };

    // Filter products based on selected color and material
    const filteredProducts = products.filter(product => {
        const colorFilter = selectedColor !== '' ? product.colorId === selectedColor : true;
        const materialFilter = selectedMaterial !== '' ? product.materialId === selectedMaterial : true;
        return colorFilter && materialFilter;
    });

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle hover events
    const handleMouseEnter = (productId) => setHoveredProductId(productId);
    const handleMouseLeave = () => setHoveredProductId(null);

    return (
        <div className='product'>
            <div className='productname'>
                <div className='productleft'>
                    <p className="filter">Filter</p>
                    <div className='productmaterial'>
                        <p className='materialtext'>Material</p>
                        <ul className='productmateriallist'>
                            {materials.map(material => (
                                <li key={material.id} onClick={() => handleMaterialClick(material.id)}>
                                    {material.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='productcolor'>
                        <p className='colortext'>Color</p>
                        <ul className='productcolorlist'>
                            {colors.map(color => (
                                <li key={color.id} onClick={() => handleColorClick(color.id)}>
                                    {color.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='productlisting'>
                    <ul className='productdetail'>
                        {currentProducts.map(product => (
                            <li key={product.id}>
                                <div className='productdiv'>
                                    <div
                                        className={`productimage ${hoveredProductId === product.id ? 'productimagehover' : ''}`}
                                        onMouseEnter={() => handleMouseEnter(product.id)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleProductClick(product.id)}
                                    >
                                        {/* "Add to Cart" on hover */}
                                        {hoveredProductId === product.id && (
                                            <div className="add-to-cart">
                                                <p>Add to Cart</p>
                                            </div>
                                        )}
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                    <div className="productdetaillist">
                                        <p className='productnametext'>{product.name}</p>
                                        <div className='productclass'>
                                            <p className='productdetailcolor'>{colors.find(c => c.id === product.colorId)?.name}</p>
                                            <p className='productmaterialcolor'>{materials.find(m => m.id === product.materialId)?.name}</p>
                                        </div>
                                        <p className='productmoney'>INR {product.price}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* Pagination buttons */}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
                            <button key={index + 1} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar for selected product details */}
            {/* <div className="sidebarone">
                <h2>Selected Products</h2>
                <ul>
                    {selectedProducts.map((selectedProduct, index) => (
                        <li key={index}>
                            <img src={selectedProduct.image} alt={selectedProduct.name} />
                            <p>Name: {selectedProduct.name}</p>
                            <p>Color: {colors.find(c => c.id === selectedProduct.colorId)?.name}</p>
                            <p>Material: {materials.find(m => m.id === selectedProduct.materialId)?.name}</p>
                            <p>Price: INR {selectedProduct.price}</p>
                            <button onClick={() => handleRemoveClick(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
}

export default Product;
