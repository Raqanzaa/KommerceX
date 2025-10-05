import { Link } from 'react-router-dom';
import Button from './common/Button';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const imageUrl = product.image ? `http://localhost:8000/storage/${product.image}` : 'https://via.placeholder.com/300';

  const handleAddToCart = () => {
    addToCart({ product_id: product.id, quantity: 1 });
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col">
      <Link to={`/product/${product.slug}`}>
        <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-700 font-bold mb-4">${parseFloat(product.price).toFixed(2)}</p>
        <div className="mt-auto">
          <Button onClick={handleAddToCart} className="w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;