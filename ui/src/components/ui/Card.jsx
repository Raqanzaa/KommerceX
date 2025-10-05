// Komponen ini menerima:
// - imgSrc: URL gambar
// - imgAlt: Teks alt untuk gambar
// - children: Konten yang akan ditampilkan di bawah gambar
// - className: Kelas tambahan untuk kustomisasi dari luar
export default function CustomCard({ imgSrc, imgAlt, children, className }) {
  return (
    // Div utama kartu:
    // - overflow-hidden adalah kunci agar sudut gambar mengikuti sudut kartu yang membulat.
    // - border, shadow, dan bg adalah untuk styling dasar.
    // - flex flex-col h-full memungkinkan kartu untuk meregang secara vertikal.
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md overflow-hidden flex flex-col ${className}`}
    >
      {imgSrc && (
        <img
          alt={imgAlt || ""}
          src={imgSrc}
          className="w-full aspect-square object-cover"
        />
      )}

      <div className="flex-grow flex flex-col p-2 sm:p-4 px-2">{children}</div>
    </div>
  );
}
