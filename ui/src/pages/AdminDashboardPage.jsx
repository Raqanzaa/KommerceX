import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productService";
import Spinner from "../components/common/Spinner";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import ProductForm from "../components/admin/ProductForm";
import ProductTable from "../components/admin/ProductTable";

const AdminDashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();

  // Fetch products
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: getProducts,
    select: (data) => data.data.data,
  });

  // Create Product Mutation
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      closeModal();
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to create product."),
  });

  // Update Product Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      closeModal();
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to update product."),
  });

  // Delete Product Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to delete product."),
  });

  // Handlers
  const handleFormSubmit = (formData, productId) => {
    // `formData` di sini sudah merupakan objek FormData yang benar dari ProductForm
    // `productId` adalah undefined jika ini adalah 'create', atau berisi ID jika 'edit'

    if (productId) {
      // Ini adalah mode edit
      formData.append("_method", "PUT");
      updateMutation.mutate({ id: productId, data: formData });
    } else {
      // Ini adalah mode create
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  const openModalForNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <Spinner />
      </div>
    );
  if (isError)
    return <p className="text-center text-red-500">Error loading products.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <Button onClick={openModalForNew}>Add New Product</Button>
      </div>

      <ProductTable
        products={products}
        onEdit={openModalForEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingProduct ? "Edit Product" : "Add New Product"}
      >
        <ProductForm
          onSubmit={handleFormSubmit} // onSubmit sekarang sudah cocok
          initialData={editingProduct}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      </Modal>
    </div>
  );
};

export default AdminDashboardPage;
