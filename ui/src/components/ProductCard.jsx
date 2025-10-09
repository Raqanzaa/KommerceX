import { Link } from "react-router-dom";
import Button from "./common/Button";
import { useCart } from "../hooks/useCart";
import { useCurrency } from "../hooks/useCurrency"; // Import useCurrency hook

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { formatIDR } = useCurrency(); // Destructure function dari hook
  const imageUrl = product.image
    ? `http://localhost:8000/storage/${product.image}`
    : "https://via.placeholder.com/300";

  const handleAddToCart = () => {
    addToCart({ product_id: product.id, quantity: 1 });
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col hover:shadow-xl transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description || "No description available"}
        </p>

        {/* Price with IDR formatting */}
        <div className="mt-2 mb-4">
          <p className="text-green-600 font-bold text-xl">
            {formatIDR(product.price)} {/* Gunakan formatIDR langsung */}
          </p>
          <p className="text-gray-500 text-sm mt-1">Stock: {product.stock}</p>
        </div>

        <div className="mt-auto">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
