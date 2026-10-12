import React, { useState } from "react";

// Images
import logo from "../assets/frontend_assets/logo.png";
import searchIcon from "../assets/frontend_assets/search_icon.png";
import profileIcon from "../assets/frontend_assets/profile_icon.png";
import cartIcon from "../assets/frontend_assets/cart_icon.png";
import menuIcon from "../assets/frontend_assets/menu_icon.png";
import dropdownIcon from "../assets/frontend_assets/dropdown_icon.png";

import { useCart } from "../Context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      {/* Logo */}
      <a href="/">
        <img src={logo} alt="Logo" className="w-36" />
      </a>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["HOME", "COLLECTION", "ABOUT", "CONTACT", "ORDER"].map((item) => (
          <a
            key={item}
            href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
            className="flex flex-col items-center gap-1 hover:text-black"
          >
            <p>{item}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </a>
        ))}

        <a
          href="/"
          target="_blank"
          className="border px-5 text-xs py-1 rounded-full -mt-2"
        >
          <p className="mt-1">Admin Panel</p>
        </a>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        <img src={searchIcon} className="w-5 cursor-pointer" alt="Search" />

        {/* Profile Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsProfileOpen(true)}
          onMouseLeave={() => setIsProfileOpen(false)}
        >
          <img
            src={profileIcon}
            className="w-5 cursor-pointer"
            alt="Profile"
          />

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-36 bg-white border rounded-md shadow-lg text-sm text-gray-600 z-50">
              <a
                href="/login"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
              >
                Login
              </a>
              <p
                onClick={handleLogout}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-black"
              >
                Logout
              </p>
            </div>
          )}
        </div>

        {/* Cart */}
        <a href="/cart" className="relative">
          <img src={cartIcon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {cartCount}
          </p>
        </a>

        {/* Mobile Menu Icon */}
        <img
          src={menuIcon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-all duration-300 z-50 ${
          isMenuOpen ? "w-64" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={dropdownIcon} className="h-4 rotate-180" alt="Back" />
            <p>Back</p>
          </div>

          <a className="py-2 pl-6 border" href="/">HOME</a>
          <a className="py-2 pl-6 border" href="/collection">COLLECTION</a>
          <a className="py-2 pl-6 border" href="/about">ABOUT</a>
          <a className="py-2 pl-6 border" href="/contact">CONTACT</a>
          <a className="py-2 pl-6 border" href="/order">ORDER</a>

          <a
            href="https://admin.foreverbuy.in/"
            target="_blank"
            className="py-2 pl-6 border"
          >
            ADMIN
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
