import ProductListPage from "../features/e-commerce/pages/ProductListPage";
import Navbar from "../features/e-commerce/components/Navbar";

export default function ProductsPage() {
  // Halaman ini bisa saja memiliki komponen lain seperti header khusus atau sidebar,
  // tapi untuk sekarang, tugas utamanya adalah menampilkan fitur daftar produk.
  return (
    <>
      <Navbar />
      <ProductListPage />
    </>
  );
}
