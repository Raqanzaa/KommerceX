import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../common/Input";
import Button from "../common/Button";

const ProductForm = ({ onSubmit, initialData = null, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Populate form with initial data when editing
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
    } else {
      reset(); // Clear form for new product
    }
  }, [initialData, setValue, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Product Name"
        {...register("name", { required: "Product name is required" })}
        error={errors.name}
      />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          {...register("description")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="3"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price"
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
          })}
          error={errors.price}
        />
        <Input
          label="Stock"
          type="number"
          {...register("stock", {
            required: "Stock is required",
            valueAsNumber: true,
          })}
          error={errors.stock}
        />
      </div>
      <Input
        label="Product Image"
        type="file"
        {...register("image")}
        error={errors.image}
      />
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register("is_active")}
            className="form-checkbox"
            defaultChecked={initialData?.is_active ?? true}
          />
          <span className="ml-2 text-sm text-gray-700">Is Active</span>
        </label>
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
        {isSubmitting
          ? "Saving..."
          : initialData
          ? "Update Product"
          : "Create Product"}
      </Button>
    </form>
  );
};

export default ProductForm;
