import React from "react";

const FilterSidebar = ({
  categories,
  types,
  toggleCategory,
  toggleType,
}) => {
  return (
    <div className="min-w-60">

      <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
        FILTERS
      </p>

      {/* CATEGORY */}
      <div className="border border-gray-300 pl-5 py-3 mt-6">
        <p className="mb-3 text-sm font-medium">CATEGORIES</p>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          {["Men", "Women", "Kids"].map((item) => (
            <label key={item} className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                checked={categories.includes(item)}
                onChange={() => toggleCategory(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* TYPE */}
      <div className="border border-gray-300 pl-5 py-3 my-5">
        <p className="mb-3 text-sm font-medium">TYPE</p>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
            <label key={item} className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                checked={types.includes(item)}
                onChange={() => toggleType(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
