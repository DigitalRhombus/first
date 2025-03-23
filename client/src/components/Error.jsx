import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorImage from "../assets/errorpage.jfif"; // Make sure to add a premium-looking error image

export default function Error() {
  const navigate = useNavigate();

  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white" 
      style={{ backgroundImage: `url(${ErrorImage})` }}
    >
      {/* Dark Overlay for Better Text Visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Centered Text Box */}
      <div className="relative z-10 bg-white bg-opacity-10 p-10 rounded-lg text-center shadow-lg">
        <h1 className="text-5xl font-bold text-gold-400 drop-shadow-lg">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gold-500 text-black px-6 py-3 rounded-lg text-lg hover:bg-gold-600 transition-all shadow-lg"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-900 transition-all shadow-lg"
          >
            Back to Previous Page
          </button>
        </div>
      </div>
    </div>
  );
}
