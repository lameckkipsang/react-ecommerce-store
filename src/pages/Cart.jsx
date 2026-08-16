import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, dispatch } = useCart();

  // Conditional Rendering: What to show if the cart is empty
  if (cart.cartItems.length === 0) {
    return (
      <div className="p-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  // What to show if there are items in the cart
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col gap-4">
        {cart.cartItems.map((item) => (
          <Card key={item.id} className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <img src={item.image} alt={item.title} className="h-20 w-20 object-contain" />
              <div>
                <h2 className="font-semibold text-lg line-clamp-1">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
              
              {/* Dispatch the remove action */}
              <Button 
                variant="destructive" 
                onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item })}
              >
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">
          Total: ${cart.cartTotal.toFixed(2)}
        </h2>
        <Link to="/checkout">
          <Button size="lg" className="w-full md:w-auto">Proceed to Checkout</Button>
        </Link>
      </div>
    </div>
  );
}