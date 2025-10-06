import { Icon } from "@iconify/react";

export default function CustomModal({ show, onClose, title, children }) {
  // Jika prop 'show' bernilai false, jangan render apa pun
  if (!show) {
    return null;
  }

  return (
    // Backdrop: Latar belakang gelap semi-transparan yang menutupi seluruh layar
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-4"
      onClick={onClose} // Menutup modal saat backdrop diklik
    >
      {/* Panel Modal: Kontainer putih di tengah */}
      <div
        className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat panelnya diklik
      >
        {/* Header Modal */}
        <div className="mb-4 flex items-center justify-between border-b pb-4 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <Icon icon="heroicons:x-mark-20-solid" className="h-5 w-5" />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
