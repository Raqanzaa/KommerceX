import { Card } from "flowbite-react";
import { Icon } from "@iconify/react";

export default function AddProductCard({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="min-h-42 sm:h-full w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-gray-400 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500 dark:hover:bg-gray-700"
    >
      <div className="flex h-full flex-col items-center justify-center">
        <Icon
          icon="heroicons:plus-solid"
          className="h-12 w-12 text-gray-500 dark:text-gray-400"
        />
        <span className="mt-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          Tambah Produk Baru
        </span>
      </div>
    </div>
  );
}
