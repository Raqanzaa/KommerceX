import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { logoutUser } from "../../api/authService";
import toast from "react-hot-toast";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      toast.success("Logged out.");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  const cartItemCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            ShopSphere
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/cart"
                  className="relative text-gray-600 hover:text-indigo-600"
                >
                  Cart
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
