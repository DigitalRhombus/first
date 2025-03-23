import { useState } from "react";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
          
  return (
    <nav className="bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg text-white"  style={{zIndex:1}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide flex items-center">
            ✨ Celesté Jewels
          </Link>
             {/* Desktop Menu */}
             <div className="hidden md:flex space-x-8">
                  <Link to="/home" className="hover:text-gray-300">Home</Link>
                  <Link to="/about" className="hover:text-gray-300">About</Link>
                  <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                </div>
          {/* Mobile Menu Toggle */}
                  <button onClick={() => setIsOpen(!isOpen)} className="md:hidden hover:text-gray-300">
                    {isOpen ? <FaTimes /> : <FaBars />}
                  </button>
     
        </div>
        {isOpen && (
        <div className="md:hidden bg-pink-600 p-4 space-y-2">
          <Link to="/home" className="block hover:text-gray-300">Home</Link>
          <Link to="/about" className="block hover:text-gray-300">About</Link>
          <Link to="/contact" className="block hover:text-gray-300">Contact</Link>
        </div>
      )}  
      </div>

    
    </nav>
  );
};

export default Navbar1;
