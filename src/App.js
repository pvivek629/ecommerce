
import './App.css';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';
import Product from "./component/Product/Product";
import { useState } from 'react';

function App() {
  // single state to manage cart between sidebar & products.
  const [cartProducts,setCartProducts]=useState('');
  const [cartNumber, setCartNumber] = useState(0);
  const [isFeaturedClicked, setFeaturedClicked] = useState(false);
  const [isAllProductsClicked, setAllProductsClicked] = useState(false);

  return (
    <div className="App">
      <Navbar cartProducts={cartProducts} setCartProducts={setCartProducts} cartNumber={cartNumber} setCartNumber={setCartNumber} isFeaturedClicked={isFeaturedClicked} setFeaturedClicked={setFeaturedClicked} isAllProductsClicked={isAllProductsClicked} setAllProductsClicked={setAllProductsClicked}/>
      <Product setCartProducts={setCartProducts} setCartNumber={setCartNumber} isFeaturedClicked={isFeaturedClicked} isAllProductsClicked={isAllProductsClicked}/>
      <Footer/>
    </div>
  );
}

export default App;
