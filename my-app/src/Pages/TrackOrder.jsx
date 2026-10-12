import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrackOrder = () => {
  const { id } = useParams(); // 👈 order id from URL

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const steps = ["PLACED", "SHIPPED", "DELIVERED"];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/orders/${id}`,
          { withCredentials: true }
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Order not found", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading order...</div>;
  }

  if (!order) {
    return <div className="text-center py-20">Order not found</div>;
  }

  const currentStep = steps.indexOf(order.orderStatus);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 bg-gray-50">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">
          Track Order <span className="text-gray-600">#{order.id}</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Order placed on {new Date(order.createdAt).toDateString()}
        </p>
      </div>

      {/* STATUS TRACKER */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step} className="flex-1 text-center">
              <div
                className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                  ${index <= currentStep ? "bg-black text-white" : "bg-gray-300 text-gray-600"}`}
              >
                {index + 1}
              </div>
              <p className={`mt-2 text-sm 
                ${index <= currentStep ? "text-black" : "text-gray-400"}`}>
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ORDER DETAILS */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* ITEMS */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium mb-4">Order Items</h3>

          {order.orderItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 border-b py-4">
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">₹{item.price}</p>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h3 className="font-medium mb-4">Order Summary</h3>

          <div className="flex justify-between text-sm mb-2">
            <span>Payment</span>
            <span>{order.paymentType.toUpperCase()}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Payment Status</span>
            <span className="text-green-600">{order.paymentStatus}</span>
          </div>

          <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h3 className="font-medium mb-3">Delivery Address</h3>

        <p className="text-sm">
          {order.address.firstName} {order.address.lastName}
        </p>
        <p className="text-sm text-gray-600">{order.address.street}</p>
        <p className="text-sm text-gray-600">
          {order.address.city}, {order.address.state}
        </p>
        <p className="text-sm text-gray-600">{order.address.country}</p>
      </div>

    </div>
  );
};

export default TrackOrder;
