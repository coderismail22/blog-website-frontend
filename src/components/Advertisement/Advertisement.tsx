export default function Advertisement({ src, alt, width, height }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
      />
    </div>
  );
}
