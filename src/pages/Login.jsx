import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const existingUsers = JSON.parse(localStorage.getItem('ecommerce_users')) || [];
    const validUser = existingUsers.find(
      (user) => user.email === email && user.password === password
    );
    if (!validUser) {
      setError('Invalid email or password. Please try again or register.');
      return;
    }
    localStorage.setItem('ecommerce_session', JSON.stringify({ email }));
    navigate('/products');
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <Input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-4" size="lg">
            Sign In
          </Button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}