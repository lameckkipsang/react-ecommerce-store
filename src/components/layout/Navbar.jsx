import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 
import { Badge } from '../ui/badge'; 
import { Button } from '../ui/button'; // Added Button import for Auth actions

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation(); // Forces Navbar to re-render on route change

  // Check if user is currently logged in
  const session = localStorage.getItem('ecommerce_session');

  const handleLogout = () => {
    // 1. Remove the session from our simulated database
    localStorage.removeItem('ecommerce_session');
    
    // 2. Redirect the user back to the login page
    navigate('/login');
  };

  // Calculate total items (this correctly adds up the quantities of everything in the cart)
  const totalItems = cart.cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="p-4 bg-gray-100 flex justify-between items-center shadow-sm mb-8">
      <div className="font-bold text-xl">
        <Link to="/home">E-Commerce</Link>
      </div>
      <div className="flex gap-6 items-center">
        <Link to="/home" className="hover:text-blue-600">Home</Link>
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        
        {/* Cart Link with conditional Badge */}
        <Link to="/cart" className="hover:text-blue-600 flex items-center gap-1">
          Cart 
          {/* Only show the badge if there are items in the cart */}
          {totalItems > 0 && (
            <Badge variant="destructive" className="rounded-full px-2 py-0.5 text-xs">
              {totalItems}
            </Badge>
          )}
        </Link>
        
        {/* Conditional Authentication Rendering */}
        {session ? (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <div className="flex gap-4 items-center">
            <Link to="/login" className="hover:text-blue-600">Login</Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}