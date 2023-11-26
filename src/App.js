
import './App.css';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';
import Product from "./component/Product/Product";
import { useState } from 'react';

function App() {
  // single state to manage cart between sidebar & products.
  const [cartProducts,setCartProducts]=useState('');
  return (
    <div className="App">
      <Navbar cartProducts={cartProducts} setCartProducts={setCartProducts} />
      <Product setCartProducts={setCartProducts}/>
      <Footer/>
    </div>
  );
}

export default App;
