// Product.js

import React, { useState, useEffect } from 'react';
import "./Product.css";

const Product = ({ onAddToCart, setCartProducts, setCartNumber, isAllProductsClicked, isFeaturedClicked }) => {
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
        const allProductsUrl = 'https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/products';
        const featuredProductIdsUrl = 'https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/featured';

        const fetchProducts = async () => {
            try {
                const [allProductsResponse, featuredProductIdsResponse] = await Promise.all([
                    fetch(allProductsUrl, { headers: { Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo' } }),
                    fetch(featuredProductIdsUrl, { headers: { Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo' } }),
                ]);

                const [allProductsData, featuredProductIdsData] = await Promise.all([
                    allProductsResponse.json(),
                    featuredProductIdsResponse.json(),
                ]);

                const allProducts = allProductsData.products || [];

                if (isFeaturedClicked) {
                    if (featuredProductIdsData.featured) {
                        const featuredProductIds = featuredProductIdsData.featured.map(product => product.productId);
                        if (featuredProductIds.length > 0) {
                            const filteredFeaturedProducts = allProducts.filter(product => featuredProductIds.includes(product.id));
                            setProducts(filteredFeaturedProducts);
                        } else {
                            console.warn('No Featured Product Ids found.');
                        }
                    } else {
                        console.warn('Featured Product Ids data is undefined.');
                    }
                } else {
                    setProducts(allProducts);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [isFeaturedClicked]);

    const handleColorClick = (colorId) => {
        setSelectedColor(colorId);
        setSelectedMaterial('');
        setCurrentPage(1);
        setHoveredProductId(null);
    };

    const handleMaterialClick = (materialId) => {
        setSelectedMaterial(materialId);
        setSelectedColor('');
        setCurrentPage(1);
        setHoveredProductId(null);
    };

    const handleProductClick = (productId) => {
        const clickedProduct = products.find(product => product.id === productId);
        setSelectedProducts(prevSelectedProducts => [...prevSelectedProducts, clickedProduct]);
        const storedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
        const updatedSelectedProducts = [...storedSelectedProducts, clickedProduct];
        localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
        setCartProducts(prevProducts => [...prevProducts, clickedProduct]);
        setSidebarVisible(true);
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

        </div>
    );
}

export default Product;
