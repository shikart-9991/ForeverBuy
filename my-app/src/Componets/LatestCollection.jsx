import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LatestCollections = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/product/latest"
        );
        setLatestProducts(response.data);
      } catch (error) {
        console.error("Error fetching latest products", error);
      }
    };
    fetchLatestProduct();
  }, []);

  return (
    <div className="my-14">

      {/* SECTION HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold tracking-wide">
          LATEST <span className="text-gray-700">COLLECTIONS</span>
        </h2>
        <div className="flex justify-center mt-2">
          <span className="w-14 h-[2px] bg-gray-700"></span>
        </div>
        <p className="max-w-xl mx-auto mt-4 text-sm text-gray-500">
          Discover the newest arrivals curated just for you.
        </p>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {latestProducts.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition">

              {/* IMAGE */}
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={item.imageUrls[0]}
                  alt={item.name}
                  className="w-full h-56 object-cover 
                             group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-3 text-center">
                <p className="text-sm text-gray-700 truncate">
                  {item.name}
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  ₹{item.price}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestCollections;
