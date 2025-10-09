import { useCart } from "../hooks/useCart";
import Spinner from "../components/common/Spinner";
import Button from "../components/common/Button";
import { useCurrency } from "../hooks/useCurrency"; 

const CartPage = () => {
  const {
    cart,
    isLoading,
    updateCartItem,
    removeFromCart,
    checkout,
    isCheckingOut,
  } = useCart();

  if (isLoading)
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );

  if (!cart || cart.items.length === 0) {
    return <div className="text-center text-gray-500">Your cart is empty.</div>;
  }

  const handleQuantityChange = (item, quantity) => {
    const newQuantity = parseInt(quantity, 10);
    if (newQuantity > 0) {
      updateCartItem({ id: item.id, quantity: newQuantity });
    } else {
      removeFromCart(item.id);
    }
  };

  const { formatIDR } = useCurrency();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      <div className="divide-y divide-gray-200">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <img
                src={`http://localhost:8000/storage/${item.product.image}`}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-600">
                  {formatIDR(item.product.price)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item, e.target.value)}
                className="w-16 p-1 border rounded"
                min="1"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <p className="text-xl font-bold">
          Total: {formatIDR(cart.total)}
        </p>
        <Button onClick={checkout} disabled={isCheckingOut} className="mt-4">
          {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
