import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import { Icon } from "@iconify/react";

export default function ProductCard({ product, onClick }) {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
    >
      <Badge color="primary" size="xs" className="absolute top-2 left-2 z-10">
        {product.category}
      </Badge>

      <Card imgAlt={product.name} imgSrc={product.imageUrl} className="h-full">
        <div className="flex h-full flex-col">
          {/* Bagian Nama & Info Sekunder */}
          <div className="flex-grow">
            <h5 className="text-sm font-semibold tracking-tight text-gray-900 line-clamp-2 dark:text-white md:text-base">
              {product.name}
            </h5>
            {/* Rating */}
          </div>

          {/* Bagian Harga & Tombol Aksi */}
          <div className="pt-2">
            {/* -> Logika kondisional untuk menampilkan harga diskon */}
            {product.discount > 0 ? (
              // -> Tampilan jika ADA diskon
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge color="danger" size="xs">
                    <Icon icon="heroicons:tag-solid" className="mr-1 h-3 w-3" />
                    {product.discount}% OFF
                  </Badge>
                  <span className="text-xs text-gray-500 line-through">
                    {formatRupiah(product.originalPrice)}
                  </span>
                </div>
                <p className="text-base font-bold text-red-600 md:text-lg">
                  {formatRupiah(product.price)}
                </p>
              </div>
            ) : (
              // -> Tampilan jika TIDAK ADA diskon
              <p className="text-base font-bold text-gray-900 dark:text-white md:text-lg">
                {formatRupiah(product.price)}
              </p>
            )}
          </div>
          <div className="mt-1 flex items-center">
            <Icon
              icon="heroicons:star-solid"
              className="mr-1 h-4 w-4 text-yellow-400"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {product.rating}
              <span className="hidden sm:inline"> ({product.reviews})</span>
            </span>
          </div>
          {/* -> Menampilkan informasi lokasi toko */}
          <div className="mt-1 flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Icon icon="heroicons:map-pin-solid" className="mr-1 h-4 w-4" />
            <span>{product.store.location}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
