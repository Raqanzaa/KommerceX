import { forwardRef } from "react";

const Input = forwardRef(({ label, type = "text", error, ...props }, ref) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        type={type}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        }`}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs italic mt-1">{error.message}</p>
      )}
    </div>
  );
});

export default Input;
