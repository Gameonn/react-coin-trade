import { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Coins from "./Coins/Coins";
import Cart from "./Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      {showCart && <Cart onClose={() => setShowCart(false)} />}
      <Header onShow={() => setShowCart(true)} />
      <Coins />
    </CartProvider>
  );
}

export default App;
