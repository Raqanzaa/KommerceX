import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/productService';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/common/Spinner';

const HomePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
    select: (data) => data.data.data // Laravel paginator nests data
  });

  if (isLoading) return <div className="text-center"><Spinner /></div>;
  if (error) return <div className="text-center text-red-500">Error fetching products.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* TODO: Add Pagination Controls */}
    </div>
  );
};

export default HomePage;