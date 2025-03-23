import React, { useEffect, useState,useContext } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import {

  useNavigate,
} from "react-router-dom";
import MainContext from "../context/main";
const Cart = () => {
  const [loading, setLoading] = useState(true);
  const userDetail = useSelector((state) => state.userDetail);
  const [cart, setCart] = useState([]);
    const context = useContext(MainContext)
    const {SERVER_URL} = context
  const navigate = useNavigate()
  useEffect(() => {
    if (userDetail?._id) {
      fetchCart();
    }
  }, [userDetail]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/cart/${userDetail._id}`);
      setCart(response.data.cart || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (accessoryId, change) => {
    try {
      const item = cart.find((item) => item.accessoryId._id === accessoryId);
      if (!item || item.quantity + change < 1) return;
      await axios.post(`${SERVER_URL}/api/cart/add`, {
        userId: userDetail._id,
        accessoryId,
        quantity: change,
      });
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (accessoryId) => {
    try {
      await axios.post(`${SERVER_URL}/api/cart/remove`, {
        userId: userDetail._id,
        accessoryId,
        decreaseBy: 9999,
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.accessoryId.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 border-b pb-2">Your Shopping Cart</h2>
      {loading ? (
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-yellow-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : cart.length === 0 ? (
        <p className="text-center text-lg font-semibold">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {cart.map((item) =>{
              console.log(item)
          
              return(
              
              <div key={item.accessoryId._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={item.accessoryId.imgUrl}
                    alt={item.accessoryId.name}
                    className="w-24 h-24 object-cover rounded-lg transition-transform transform hover:scale-105"
                  />
                  <div>
                    <h6 className="font-bold text-lg">{item.accessoryId.name}</h6>
                    <p className="text-green-600">In stock</p>
                  </div>
                </div>
                <p className="font-bold text-yellow-600">${item.accessoryId.price}</p>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 bg-yellow-500 text-white rounded-full"
                    onClick={() => {
                      if (item.quantity === 1) {
                        removeFromCart(item.accessoryId._id);
                      } else {
                        updateQuantity(item.accessoryId._id, -1);
                      }
                    }}
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-3 font-semibold">{item.quantity}</span>
                  <button
                    className="p-2 bg-yellow-500 text-white rounded-full"
                    onClick={() => updateQuantity(item.accessoryId._id, 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
                <button className="p-2 bg-red-500 text-white rounded-lg" onClick={() => removeFromCart(item.accessoryId._id)}>
                  <FaTrash /> Remove
                </button>
              </div>
            )})}
          </div>

          <div className="p-6 shadow-lg border border-yellow-500 rounded-lg bg-gray-100">
            <h4 className="font-bold text-xl mb-4">Order Summary</h4>
            <div className="flex justify-between mb-2">
              <span>Subtotal ({cart.length} items)</span>
              <span className="font-bold">${calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between mb-4 text-lg font-bold">
              <span>Total</span>
              <span className="text-yellow-600">${calculateSubtotal()}</span>
            </div>
            <button onClick={()=>{navigate("/checkout")}} className="w-full bg-yellow-500 text-white py-2 rounded-lg font-bold hover:bg-yellow-600">Proceed to Buy</button>
            <p className="text-center text-sm text-gray-600 mt-3">Apply coupons at checkout</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
