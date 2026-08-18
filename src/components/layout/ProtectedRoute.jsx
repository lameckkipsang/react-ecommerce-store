import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // 1. Check if the user has an active session in our simulated database
  const session = localStorage.getItem('ecommerce_session');
  
  // 2. If no session exists, redirect them to the Login page immediately
  if (!session) {
    // The "replace" prop prevents them from using the back button to bypass the lock
    return <Navigate to="/login" replace />;
  }
  
  // 3. If they are logged in, render the requested page (the children)
  return children;
}