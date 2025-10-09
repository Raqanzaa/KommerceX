import { useEffect, useState } from "react";
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
    watch,
  } = useForm({
    // Set nilai default dari initialData
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      is_active: true,
    },
  });

  const [preview, setPreview] = useState(null);
  const imageFile = watch("image");

  // Efek ini menangani populasi form dan preview gambar awal
  useEffect(() => {
    if (initialData) {
      // Reset form dengan nilai awal untuk memastikan konsistensi
      reset(initialData);
      if (initialData.image) {
        setPreview(`http://localhost:8000/storage/${initialData.image}`); // Gunakan URL lengkap
      } else {
        setPreview(null);
      }
    } else {
      // Mode 'Create', pastikan form kosong
      reset({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        is_active: true,
        image: null,
      });
      setPreview(null);
    }
  }, [initialData, reset]);

  // Efek ini HANYA untuk menampilkan preview saat gambar BARU dipilih
  useEffect(() => {
    // PERBAIKAN DI SINI:
    // Pastikan imageFile ada, memiliki panjang, dan elemen pertamanya adalah objek File.
    if (imageFile && imageFile.length > 0 && imageFile[0] instanceof File) {
      const file = imageFile[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [imageFile]);

  // Fungsi submit yang dimodifikasi
  const handleFormSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "image") {
        // Handle boolean 'is_active'
        if (key === "is_active") {
          formData.append(key, data[key] ? 1 : 0);
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    if (data.image && data.image[0] instanceof File) {
      formData.append("image", data.image[0]);
    }

    // Panggil onSubmit dari parent dengan DUA argumen: FormData dan ID
    onSubmit(formData, initialData?.id);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      {/* --- Input Name --- */}
      <Input
        label="Product Name"
        {...register("name", { required: "Product name is required" })}
        error={errors.name}
      />

      {/* --- Textarea Description --- */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          {...register("description")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          rows="3"
        />
      </div>

      {/* --- Input Price & Stock --- */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price"
          type="number"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
            min: { value: 0, message: "Price cannot be negative" },
          })}
          error={errors.price}
        />
        <Input
          label="Stock"
          type="number"
          {...register("stock", {
            required: "Stock is required",
            valueAsNumber: true,
            min: { value: 0, message: "Stock cannot be negative" },
          })}
          error={errors.stock}
        />
      </div>

      {/* --- Input Image & Preview --- */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Image
        </label>
        <input
          type="file"
          {...register("image")}
          className="block w-full text-sm"
          accept="image/*"
        />
        {preview && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
            <img
              src={preview}
              alt="Product preview"
              className="w-32 h-32 object-cover border rounded"
            />
          </div>
        )}
      </div>

      {/* --- Checkbox Is Active --- */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register("is_active")}
            className="form-checkbox"
          />
          <span className="ml-2 text-sm text-gray-700">
            Publish this product
          </span>
        </label>
      </div>

      {/* --- Tombol Submit --- */}
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
