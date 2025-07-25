import React from 'react';

import {Routes,Route, Navigate} from "react-router-dom"

// Components
import Store from './components/Store';
import ProductDetails from './components/ProductDetails';
import Navbar from './components/shared/Navbar';
import ShopCart from './components/ShopCart';


// Context component
import ProductContextProvider from './context/ProductContextProvider';
import CartContextProvider from './context/CartContextProvider';

const App = () => {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <Navbar/>
        <Routes>
          <Route path="/products/product/:id" element={<ProductDetails/>}/>
          <Route path="/products" element={<Store/>}/>
          <Route path="/Cart" element={<ShopCart/>}/>
          <Route path='/*' element={<Navigate to="/products"/>}/>
        </Routes>
      </CartContextProvider>
    </ProductContextProvider>
  );
};

export default App;