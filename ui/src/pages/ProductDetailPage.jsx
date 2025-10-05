import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../api/productService";
import { useCart } from "../hooks/useCart";
import Spinner from "../components/common/Spinner";
import Button from "../components/common/Button";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    select: (data) => data.data, // Select the product object from the API response
    enabled: !!slug, // Only run the query if the slug exists
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart({ product_id: product.id, quantity: 1 });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error: {error.response?.data?.message || error.message}
      </p>
    );
  }

  if (!product) {
    return <p className="text-center text-gray-500">Product not found.</p>;
  }

  const imageUrl = product.image
    ? `${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}/storage/${
        product.image
      }`
    : "https://via.placeholder.com/500x500";

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-indigo-600 mb-4">
            ${parseFloat(product.price).toFixed(2)}
          </p>
          <div className="text-gray-600 mb-6">
            <p>{product.description || "No description available."}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>

          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full md:w-auto"
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
