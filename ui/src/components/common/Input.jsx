// Komponen ini menerima:
// - icon: Komponen ikon (opsional) untuk ditampilkan di dalam input.
// - className: Kelas tambahan untuk styling dari luar.
// - ...props: Semua properti standar dari elemen <input> (id, type, value, onChange, dll.).
export default function TextInput({ icon, className, ...props }) {
  // Menentukan kelas padding berdasarkan ada atau tidaknya ikon
  const paddingClass = icon ? "pl-10" : "pl-4";

  return (
    // 'relative' diperlukan untuk memposisikan ikon secara absolut di dalamnya
    <div className="relative w-full">
      {/* Render ikon jika ada */}
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
      )}

      {/* Elemen input yang sebenarnya */}
      <input
        // Gabungkan semua kelas yang dibutuhkan
        className={`
          w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 
          focus:border-cyan-500 focus:ring-cyan-500 
          dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
          dark:focus:border-cyan-500 dark:focus:ring-cyan-500
          text-sm sm:text-base  // <-- KUNCI RESPONSIVE FONT
          ${paddingClass}         // <-- Padding dinamis
          ${className || ""}     // <-- Kelas tambahan dari luar
        `}
        {...props} // <-- Meneruskan semua prop lain ke input
      />
    </div>
  );
}
