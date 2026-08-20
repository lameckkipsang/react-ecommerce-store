import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useCart } from '../../context/CartContext'; 
import { Badge } from '../ui/badge'; 
import { Button } from '../ui/button'; 

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation(); 

  const session = localStorage.getItem('ecommerce_session');

  const handleLogout = () => {
    localStorage.removeItem('ecommerce_session');
    navigate('/login');
  };

  //Memoize the total items calculation
  const totalItems = useMemo(() => {
    return cart.cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cart.cartItems]);

  return (
    <nav className="p-4 bg-gray-100 flex justify-between items-center shadow-sm mb-8">
      <div className="font-bold text-xl">
        <Link to="/home">E-Commerce</Link>
      </div>
      <div className="flex gap-6 items-center">
        <Link to="/home" className="hover:text-blue-600">Home</Link>
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        
        <Link to="/cart" className="hover:text-blue-600 flex items-center gap-1">
          Cart 
          {totalItems > 0 && (
            <Badge variant="destructive" className="rounded-full px-2 py-0.5 text-xs">
              {totalItems}
            </Badge>
          )}
        </Link>
        
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