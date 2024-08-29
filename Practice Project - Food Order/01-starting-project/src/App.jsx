import { useEffect, useState } from "react";
import Header from "./components/Header";
import { getProducts } from "./http";
import Products from "./components/Products";
import CartContextProvider from "./store/CartContextProvider";
import CartModal from "./components/CartModal";
import UserProgressProvider from "./store/UserProgressContext";
import Checkout from "./components/Checkout";

function App() {
  return (
    <UserProgressProvider>
      <CartContextProvider>
        <Header />
        <Products/>
        <CartModal />
        <Checkout />
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
