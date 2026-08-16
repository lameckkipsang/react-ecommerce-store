import { createContext, useReducer, useContext } from 'react';

// 1. Set the initial state of the cart
const initialState = {
  cartItems: [],
  cartTotal: 0,
};

// 2. Create the reducer function to handle actions
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // Check if item is already in cart
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      
      let updatedItems = [...state.cartItems];
      
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        // New item, add it with a quantity of 1
        updatedItems.push({ ...action.payload, quantity: 1 });
      }

      return {
        ...state,
        cartItems: updatedItems,
        cartTotal: state.cartTotal + action.payload.price,
      };
    }
    case 'REMOVE_FROM_CART': {
      const filteredItems = state.cartItems.filter(item => item.id !== action.payload.id);
      // Recalculate total
      const newTotal = filteredItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        cartItems: filteredItems,
        cartTotal: newTotal,
      };
    }
    default:
      return state;
  }
}

// 3. Create the Context
const CartContext = createContext();

// 4. Create the Provider Component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// 5. Custom Hook for easy importing
export const useCart = () => useContext(CartContext);