const ProductTable = ({ products, onEdit, onDelete }) => {
  const API_URL_BASE = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Image
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Price
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <img
                  src={
                    product.image
                      ? `${API_URL_BASE}/storage/${product.image}`
                      : "https://via.placeholder.com/60"
                  }
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {product.name}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {product.stock}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <span
                  className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                    product.is_active ? "text-green-900" : "text-red-900"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 ${
                      product.is_active ? "bg-green-200" : "bg-red-200"
                    } opacity-50 rounded-full`}
                  ></span>
                  <span className="relative">
                    {product.is_active ? "Active" : "Inactive"}
                  </span>
                </span>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <button
                  onClick={() => onEdit(product)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
