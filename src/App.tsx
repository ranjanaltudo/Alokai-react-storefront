import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./Intro";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import { CartProvider } from "./contexts/CartContext"; // Make sure this path is correct

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;