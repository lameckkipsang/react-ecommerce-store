import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-5xl font-extrabold tracking-tight mb-6">
        Welcome to <span className="text-blue-600">E-Commerce</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Discover our exclusive collection of premium products. Quality meets affordability in just a few clicks.
      </p>
      <Link to="/products">
        <Button size="lg" className="text-lg px-8">Shop Now</Button>
      </Link>
    </div>
  );
}