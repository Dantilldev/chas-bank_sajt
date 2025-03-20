export default function Card({image, alt, title, text}) {
  return (
    <div className="bg-gray-100  p-6 rounded-lg shadow-lg text-center w-96 ">
      <img
        src={image}
        alt={alt}
        className="w-full h-56 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold text-blue-950 mb-2">{title}</h2>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
