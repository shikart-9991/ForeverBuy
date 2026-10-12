import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

      {/* Left section */}
      <div>
        <img
          src={assets.logo}
          className="mb-5 w-32"
          alt="Logo"
        />

        <p className="w-full md:w-2/3 text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </p>
      </div>

      {/* Company */}
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">About us</li>
          <li className="cursor-pointer">Delivery</li>
          <li className="cursor-pointer">Privacy policy</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+1-000-000-0000</li>
          <li>greatstackdev@gmail.com</li>
          <li className="cursor-pointer">Instagram</li>
        </ul>
      </div>

    </footer>
  );
};

export default Footer;
