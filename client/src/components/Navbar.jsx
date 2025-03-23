import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import Profile from "./Profile";
import User from "../assets/user.jpeg"; // Replace with actual user profile image

const Navbar = ({ cartItemCount ,setSearchQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [query, setQuery] = useState("");

  // Handle search input change
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="font-sans bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg" >
      {/* Top Navbar */}
      <div className="flex items-center justify-between py-4 px-8">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wide" onClick={() => setProfileDropdown(false)}>
          ✨ Celesté Jewels
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8" onClick={() => setProfileDropdown(false)}>
          <Link to="/home" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:flex items-center w-72" onClick={() => setProfileDropdown(false)}>
            <input
              type="text"
              placeholder="Search Jewellery..."
              className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={query}
              onChange={handleSearchChange} 
            />
            <button className="absolute right-3 text-pink-600 hover:text-purple-400 transition">
              <FaSearch />
            </button>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative hover:text-gray-300 transition"   onClick={() => setProfileDropdown(false)}>
            <FaShoppingBag className="text-2xl" />

            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="relative flex items-center space-x-2 hover:text-gray-300 transition"
              onClick={() => setProfileDropdown(!profileDropdown)}
            >
              <img
                src={"https://res.cloudinary.com/diqpelkm9/image/upload/f_auto,q_auto/cqffsuxsmee5ivfgblx6"}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </button>

            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden" style={{ zIndex: 2 }}>
                <Link
                  to="/profile"
                  onClick={() => setProfileDropdown(false)}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Profile
                </Link>
              
                <hr />
                <Link to="/" onClick={()=>{sessionStorage.removeItem("token")}} className="block px-4 py-2 text-red-500 hover:bg-gray-200">
                  Logout
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden hover:text-gray-300">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-pink-600 p-4 space-y-2">
          <Link to="/home" className="block hover:text-gray-300">Home</Link>
          <Link to="/about" className="block hover:text-gray-300">About</Link>
          <Link to="/contact" className="block hover:text-gray-300">Contact</Link>
        </div>
      )}
    </nav>    
  );
};

export default Navbar;