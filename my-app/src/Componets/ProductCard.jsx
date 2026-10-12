import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group">

      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition">

        {/* IMAGE */}
        <div className="overflow-hidden rounded-t-lg">
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="w-full h-56 object-cover 
                       group-hover:scale-110 transition duration-300"
          />
        </div>

        {/* CONTENT */}
        <div className="p-3 text-center">
          <p className="text-sm text-gray-700 truncate">
            {product.name}
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-900">
            ₹{product.price}
          </p>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;
