import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Related = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    if (!product) return;

    console.log(relatedProducts)

    const fetchRelated = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/product/by-category",
          {
            params: {
              category: product.category,
              page : 0,
              size: 8,
            },
          }
        );

        setRelatedProducts(response.data.content);
        setTotalPages(response.data.totalPages);

      } catch (error) {
        console.error("Error fetching related products", error);
      }
    };

    fetchRelated();
  }, [product, page]);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-medium text-center mb-8">
        RELATED PRODUCTS
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {relatedProducts.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="cursor-pointer"
          >
            <img src={item.imageUrls[0]} alt={item.name} />
            <p className="mt-2">{item.name}</p>
            <p className="font-medium">₹{item.price}</p>
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border text-sm disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            {page + 1} / {totalPages}
          </span>

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Related;
