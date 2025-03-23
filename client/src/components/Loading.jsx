import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Gold Spinning Loader */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-lg font-semibold text-gray-600">
        Loading Your Sparkle...
      </p>
    </div>
  );
};

export default Loading;
