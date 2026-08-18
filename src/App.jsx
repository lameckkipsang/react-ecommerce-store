import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import Navbar from './components/layout/Navbar';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Checkout from './pages/Checkout';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;