import React from "react";

interface ProductProps {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
  onClick: () => void
}

const ProductCard: React.FC<ProductProps> = ({ id, name, image, price, quantity, category, onClick }) => {
  return (
    <div
      className="relative flex flex-col items-center p-4 bg-white shadow-md rounded-lg  cursor-pointer hover:shadow-lg transition"
      onClick={() => onClick()}
    >
      {/* Category Strip */}
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
        {category}
      </div>

      {/* Product Image */}
      <img src={image} alt={name} className="w-32 h-32 object-cover rounded-lg" />

      {/* Product Details */}
      <div className="mt-3 text-center">
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-blue-500 font-bold text-sm">Rs. {price.toFixed(2)}</p>
        <p className="text-gray-600 text-xs">Quantity: {quantity}</p>
      </div>

      {/* Add to Cart Button
      <button
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
      >
        View Details
      </button> */}
    </div>
  );
};

export default ProductCard;
