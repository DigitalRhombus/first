import React, { useEffect, useState,useContext } from "react";

import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order || {};

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -90 },
    visible: { scale: 1, rotate: 0, transition: { duration: 0.7, ease: "backOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 flex items-center justify-center p-6">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={["#FFD700", "#28A745", "#FFFFFF", "#D4AF37"]}
          numberOfPieces={200}
          recycle={false}
        />
      )}

      <motion.div
        className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-amber-200 to-green-200 opacity-20 rounded-t-3xl" />

        <motion.div
          className="flex justify-center mb-8 relative z-10"
          variants={checkmarkVariants}
          initial="hidden"
          animate="visible"
        >
          <svg
            className="w-24 h-24 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            />
            <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>

        <motion.h1
          className="text-4xl font-extrabold text-gray-800 mb-4 relative z-10 text-center"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-8 text-lg leading-relaxed relative z-10 text-center"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Thank you for shopping with <span className="font-semibold text-amber-600">Castle Jewel</span>. Your order is confirmed and will be delivered soon.
        </motion.p>

        {order._id && (
          <motion.div
            className="bg-gradient-to-r from-gray-50 to-amber-50 p-6 rounded-xl mb-8 border border-amber-100 relative z-10"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Order ID:</strong> <span className="font-mono">{order._id}</span></p>
              <p><strong>Total Amount:</strong> <span className="text-green-600 font-semibold">${order.totalAmount?.toFixed(2)}</span></p>
              <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Delivery To:</strong> {order.deliveryAddress?.fullName}, {order.deliveryAddress?.city}</p>
            </div>
          </motion.div>
        )}

        <motion.div
          className="flex justify-center gap-6 relative z-10"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold shadow-md hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
          >
            View Orders
          </button>
        </motion.div>

        <motion.p
          className="text-sm text-gray-500 mt-6 relative z-10 text-center"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Crafted with 💎 by <span className="font-semibold text-amber-600">Castle Jewel</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;