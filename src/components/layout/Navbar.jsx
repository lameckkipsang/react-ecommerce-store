import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-100 flex justify-between items-center shadow-sm">
      <div className="font-bold text-xl">
        <Link to="/">E-Commerce</Link>
      </div>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        <Link to="/login" className="hover:text-blue-600">Login</Link>
      </div>
    </nav>
  );
}