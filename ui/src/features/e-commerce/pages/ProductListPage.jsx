import { useState, useEffect } from "react";
import { Button, Label } from "flowbite-react";
import { Icon } from "@iconify/react";

import TextInput from "../../../components/ui/TextInput";
import CustomModal from "../../../components/CustomModal";
import AddProductCard from "../components/AddProductCard";
import ProductCard from "../components/ProductCard";
import { dummyProducts } from "../data/products";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setProducts(dummyProducts);
  }, []);

  const handleAddNewProduct = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newProduct = {
      id: Date.now(),
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      imageUrl: "https://picsum.photos/id/100/400/300",
      rating: 0,
      reviews: 0,
    };
    setProducts([newProduct, ...products]);
    setIsAddModalOpen(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-8">
      <div className="max-w-screen-xl mx-auto">
        {/* <header className="mb-4 md:mb-8">
          <h1 className="text-base font-bold text-gray-900 dark:text-white md:text-lg">
            Jelajahi Produk Kami
          </h1>
          <p className="flex-grow text-sm text-gray-500 dark:text-gray-400 md:text-base">
            Temukan semua yang Anda butuhkan di sini.
          </p>
        </header> */}
        <div className="mb-4 md:mb-8">
          {/* --- GANTI DENGAN CUSTOM TEXT INPUT --- */}
          <TextInput
            id="search"
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // Ikon sekarang dilewatkan sebagai prop
            icon={
              <Icon
                icon="heroicons:magnifying-glass-solid"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
              />
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          <AddProductCard onClick={() => setIsAddModalOpen(true)} />
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>

      <CustomModal
        show={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Produk Baru"
      >
        <form className="space-y-4" onSubmit={handleAddNewProduct}>
          <div>
            <Label htmlFor="name" value="Nama Produk" />
            <TextInput id="name" name="name" required />
          </div>
          <div>
            <Label htmlFor="category" value="Kategori" />
            <TextInput id="category" name="category" required />
          </div>
          <div>
            <Label htmlFor="price" value="Harga" />
            <TextInput id="price" name="price" type="number" required />
          </div>
          <Button type="submit" className="w-full">
            Simpan Produk
          </Button>
        </form>
      </CustomModal>

      <CustomModal
        show={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name}
      >
        {selectedProduct && (
          <div className="space-y-4">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <strong>Kategori:</strong> {selectedProduct.category}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(selectedProduct.price)}
            </p>
            <p>
              Ini adalah deskripsi produk. Nanti Anda bisa menambahkan kolom
              deskripsi di data produk Anda.
            </p>
            <div className="flex justify-end pt-4">
              <Button color="gray" onClick={() => setSelectedProduct(null)}>
                Tutup
              </Button>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
  );
}
