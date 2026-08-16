import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Products from './pages/Products';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<div className="p-8">Welcome to the Home Page!</div>} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<div className="p-8">Login Page</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;