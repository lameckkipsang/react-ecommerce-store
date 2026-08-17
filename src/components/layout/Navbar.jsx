import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // 1. Import your custom hook
import { Badge } from '../ui/badge'; // 2. Import the shadcn badge component

export default function Navbar() {
  // 3. Extract the cart state
  const { cart } = useCart();
  
  // 4. Calculate total items (this correctly adds up the quantities of everything in the cart)
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
        
        <Link to="/login" className="hover:text-blue-600">Login</Link>
      </div>
    </nav>
  );
}