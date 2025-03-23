import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand & About */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">✨ Celesté Jewels</h2>
          <p className="mt-2 text-gray-200 text-sm">
            Discover the beauty of handcrafted jewelry. Unique designs for every occasion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><a href="#" className="hover:text-gray-50">Home</a></li>
            <li><a href="#" className="hover:text-gray-50">Shop</a></li>
            <li><a href="#" className="hover:text-gray-50">About</a></li>
            <li><a href="#" className="hover:text-gray-50">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <p className="flex items-center gap-2 text-gray-200 text-sm">
            <FaMapMarkerAlt /> Mumbai, India
          </p>
          <p className="flex items-center gap-2 text-gray-200 text-sm">
            <FaPhone /> +91 98765 43210
          </p>
          <p className="flex items-center gap-2 text-gray-200 text-sm">
            <FaEnvelope /> support@celestejewels.com
          </p>
          {/* Social Icons */}
          <div className="flex mt-3 space-x-4 text-xl">
            <a href="#" className="hover:text-gray-50"><FaFacebook /></a>
            <a href="#" className="hover:text-gray-50"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-50"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-400 text-center pt-4 text-gray-200 text-sm">
        © {new Date().getFullYear()} Celesté Jewels. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
