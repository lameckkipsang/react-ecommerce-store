import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Checkout() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate a network request for payment processing (2 seconds)
    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment successful! Thank you for your order.");
      
      // Empty the cart
      dispatch({ type: 'CLEAR_CART' });
      
      // Send the user back to the home page
      navigate('/');
    }, 2000);
  };

  // If a user somehow gets here with an empty cart, bounce them back to products
  if (cart.cartItems.length === 0) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty!</h2>
        <Button onClick={() => navigate('/products')}>Go Shopping</Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Checkout Form */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>
        <form onSubmit={handleCheckout} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input required placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <Input required placeholder="123 React Street" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Credit Card</label>
            <Input required placeholder="XXXX-XXXX-XXXX-XXXX" type="text" maxLength="19" />
          </div>
          
          <Button type="submit" size="lg" className="mt-4" disabled={isProcessing}>
            {isProcessing ? "Processing..." : `Pay $${cart.cartTotal.toFixed(2)}`}
          </Button>
        </form>
      </Card>

      {/* Order Summary */}
      <Card className="p-6 h-fit bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex flex-col gap-3 mb-6 border-b pb-4">
          {cart.cartItems.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600 line-clamp-1 pr-4">{item.quantity}x {item.title}</span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${cart.cartTotal.toFixed(2)}</span>
        </div>
      </Card>
    </div>
  );
}