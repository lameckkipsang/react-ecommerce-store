import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import Navbar from './components/layout/Navbar';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container mx-auto">
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;