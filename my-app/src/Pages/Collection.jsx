import React, { useEffect, useState } from "react";
import FilterSidebar from "../Componets/FilterSidebar";
import ProductCard from "../Componets/ProductCard";
import axios from "axios";

const Collection = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (category) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleType = (type) => {
    setTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/product/filter",
          {
            params: {
              categories,
              subCategories: types,
              sortBy: sortType,
            },
          }
        );
        setFilteredProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [categories, types, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-8 pt-10 border-t">

      {/* SIDEBAR */}
      <FilterSidebar
        categories={categories}
        types={types}
        toggleCategory={toggleCategory}
        toggleType={toggleType}
      />

      {/* PRODUCTS */}
      <div className="flex-1">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <div className="inline-flex gap-2 items-center">
            <p className="text-2xl text-gray-500">
              ALL <span className="text-gray-800 font-semibold">COLLECTIONS</span>
            </p>
            <span className="w-10 h-[2px] bg-gray-800"></span>
          </div>

          <select
            className="border rounded px-3 py-1.5 text-sm mt-3 sm:mt-0
                       focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
