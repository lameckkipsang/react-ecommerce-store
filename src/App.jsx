import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import Navbar from './components/layout/Navbar';
import Products from './pages/Products';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<div className="p-8">Welcome to the Home Page!</div>} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<div className="p-8">Login Page coming soon...</div>} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;