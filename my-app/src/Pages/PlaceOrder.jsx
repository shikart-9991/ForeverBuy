import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useCart } from "../Context/CartContext";
import CartTotals from "../Componets/CardTotal";






const Checkout = () => {
  
  const { cartItems , clearCart } = useCart();
  console.log(cartItems)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const [paymentType, setPaymentType] = useState("cod");

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // Added async here
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const orderData = {
      address: formData,
      items: cartItems,
      paymentType: paymentType,
    };
   

    try {
      // 1. Send the POST request to the backend
      const response = await axios.post('http://localhost:8080/api/products/orders', orderData
        ,{ withCredentials: true }
      );
      
      if (response.status === 200 || response.status === 201) {
        console.log("Order Success:", response.data);
        alert("Order placed successfully!");

         clearCart();
        
        // 2. Only navigate AFTER success
        navigate('/order'); 
       
      }
    }catch (error) {
  if (error.response && error.response.status === 403) {
    navigate("/login");   
  } else {
    console.error("Error fetching orders:", error);
  }
}

  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* LEFT — DELIVERY INFO */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        {/* Heading */}
        <div className="text-xl sm:text-2xl my-3">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              DELIVERY{" "}
              <span className="text-gray-700 font-medium">INFORMATION</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>

        {/* Name */}
        <div className="flex gap-3">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>

        {/* Email */}
        <input
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />

        {/* Street */}
        <input
          required
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />

        {/* City & State */}
        <div className="flex gap-3">
          <input
            required
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>

        {/* Zip & Country */}
        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>

        {/* Phone */}
        <input
          required
          name="phoneNumber"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>
      {/* RIGHT — CART + PAYMENT */}
      <div className="mt-8 w-full sm:max-w-[420px]">
        <CartTotals />

        {/* PAYMENT */}
        <div className="mt-12">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              PAYMENT <span className="text-gray-700 font-medium">METHOD</span>
            </p>
            <p className="w-8 sm:w-12 h-[2px] bg-gray-700"></p>
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 border p-3 cursor-pointer">
              <input
                type="radio"
                checked={paymentType === "stripe"}
                onChange={() => setPaymentType("stripe")}
              />
              <span>Stripe</span>
            </label>

            <label className="flex items-center gap-3 border p-3 cursor-pointer">
              <input
                type="radio"
                checked={paymentType === "razorpay"}
                onChange={() => setPaymentType("razorpay")}
              />
              <span>Razorpay</span>
            </label>

            <label className="flex items-center gap-3 border p-3 cursor-pointer">
              <input
                type="radio"
                checked={paymentType === "cod"}
                onChange={() => setPaymentType("CASH ON DILEVERY")}
              />
              <span>Cash on Delivery</span>
            </label>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm disabled:opacity-50"
              disabled={cartItems.length === 0}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
