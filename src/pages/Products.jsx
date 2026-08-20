import { useState, useEffect, useCallback, useMemo } from 'react'; 
import { useCart } from '../context/CartContext'; 
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { dispatch } = useCart(); 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  //useCallback
  const handleAddToCart = useCallback((product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }, [dispatch]);

  // Memoize filtered products so search doesn't lag
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <Input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {loading ? (
        <div className="text-center text-xl mt-12">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="h-48 w-full object-contain mb-4"
                />
                <h2 className="font-semibold text-lg line-clamp-2 mb-2">{product.title}</h2>
                <p className="text-gray-600 text-sm capitalize mb-2">{product.category}</p>
              </div>
              
              <div className="mt-4">
                <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
                <Button 
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}