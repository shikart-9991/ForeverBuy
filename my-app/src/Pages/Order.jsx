import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrderItem from "../Componets/OrderItems";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortType , setSortType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
    const response = await axios.get(
  "http://localhost:8080/api/products/orders?page=0&size=4",
  { withCredentials: true }
);



console.log(response.data.content);
       
        setOrders(response.data.content);
        setTotalPages(response.data.totalPages);

      }catch (error) {
  if (error.response && error.response.status === 403) {
    navigate("/login");   
  } else {
    console.error("Error fetching orders:", error);
  }
}
 finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  if (loading) {
    return (
      <div className="text-center pt-24 text-gray-600">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="border-t pt-16 max-w-5xl mx-auto">

      {/* ================= PAGE HEADER ================= */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
  
  {/* LEFT – TITLE */}
  <div className="flex-1">
    <div className="inline-flex gap-3 items-center mb-2">
      <p className="text-2xl font-semibold text-gray-700">
        MY <span className="text-gray-900">ORDERS</span>
      </p>
      <span className="w-10 h-[2px] bg-gray-800"></span>
    </div>

    <p className="text-sm text-gray-500">
      View and track your recent orders
    </p>
  </div>

  {/* RIGHT – SORT */}
  <div>
    <select
      className="border border-gray-300 rounded-md text-sm px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-gray-800"
      value={sortType}
      onChange={(e) => setSortType(e.target.value)}
    >
      <option value="relevant">Sort by: Relevant</option>
      <option value="low-high">Sort by: Price: Low to High</option>
      <option value="high-low">Sort by: Price: High to Low</option>
    </select>
  </div>

</div>


      {/* ================= ORDERS LIST ================= */}
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-sm rounded-lg mb-8 border"
          >

            {/* ORDER HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-6 py-4 border-b bg-gray-50 rounded-t-lg">
              <div className="text-sm">
                <p className="font-medium">
                  Order #{order.id}
                </p>
                <p className="text-gray-500">
                  Placed on {new Date(order.createdAt).toDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-3 sm:mt-0">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full
                    ${
                      order.orderStatus === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {order.orderStatus}
                </span>

                <button
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="border px-4 py-1.5 text-sm rounded-sm
                             hover:bg-black hover:text-white transition"
                >
                  Track Order
                </button>
              </div>
            </div>

            {/* ORDER ITEMS */}
            <div className="px-6 py-4">
              {order.orderItems.map((item) => (
                <OrderItem
                  key={item.id}
                  item={item}
                  status={order.orderStatus}
                  paymentType={order.paymentType}
                  createdAt={order.createdAt}
                  address={order.address}
                />
              ))}
            </div>

          </div>
        ))
      ) : (
        <p className="text-gray-600">
          You haven't placed any orders yet.
        </p>
      )}

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-10">

          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border text-sm
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-black hover:text-white transition"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page <b>{page + 1}</b> of <b>{totalPages}</b>
          </span>

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border text-sm
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-black hover:text-white transition"
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
};

export default Orders;
