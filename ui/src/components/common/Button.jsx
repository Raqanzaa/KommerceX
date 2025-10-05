const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-gray-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
