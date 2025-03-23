import React, { useEffect, useState,useContext } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetail } from "../store/slice/UserDetailSlice";
import MainContext from "../context/main";

export default function Home({ searchQuery }) { // Ensure searchQuery has a default value
  const dispatch = useDispatch();
  const [accessories, setAccessories] = useState([]);
  const context = useContext(MainContext)
  const {SERVER_URL} = context
  const [filteredAccessories, setFilteredAccessories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const userDetail = useSelector((state) => state.userDetail);
  const [cartItemCount, setCartItemCount] = useState(0); // Track cart item count

  const categories = ["All", "Rings", "Earrings", "NecklacesAndPendants", "BraceletsAndBangles", "Chains", "NosePinsAndNath"];


  useEffect(() => {
    fetchAccessories();
    fetchCartItemCount(); // Fetch cart item count on load
  }, []);

  // Fetch all accessories
  const fetchAccessories = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/accessories/all`);
      setAccessories(response.data);
      setFilteredAccessories(response.data);
    } catch (error) {
      console.error("Error fetching accessories:", error);
    }
  };

  // Fetch cart item count
  const fetchCartItemCount = async () => {
    try {
      if (!userDetail || !userDetail._id) return;
      const response = await axios.get(`${SERVER_URL}/api/cart/${userDetail._id}`);
      setCartItemCount(response.data.cart.length);
    } catch (error) {
      console.error("Error fetching cart item count:", error);
    }
  };

  // Filter accessories based on category
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredAccessories(accessories);
    } else {
      setFilteredAccessories(accessories.filter((item) => item.category === category));
    }
  };

  // Add to Cart
  const addToCart = async (accessoryId) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/cart/add`, {
        userId: userDetail._id,
        accessoryId,
        quantity: 1,
      });
      setCartItemCount(response.data.cart.length); // Update cart item count
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

    // 🔹 Ensure search filtering works correctly
    useEffect(() => {
      if (!searchQuery || searchQuery.trim() === "") {
        setFilteredAccessories(accessories);
      } else {
        const filtered = accessories.filter((item) =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAccessories(filtered);
      }
    }, [searchQuery, accessories]); // Ensure filtering updates when accessories change
  

  return (
    <div>
      {/* Category Navbar */}
      <div className="flex flex-wrap justify-center bg-purple-700 py-3 text-sm font-semibold border-t border-purple-500">
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => filterByCategory(item)}
            className={`mx-4 text-white hover:text-pink-300 transition ${
              selectedCategory === item ? "underline" : ""
            }`}
          >
            {item.replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
        <button className="ml-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-md shadow-md font-bold hover:scale-105 transition">
          📢 OFFERS
        </button>
      </div>

      {/* Featured Collection */}
      <section className="py-16 text-center">
        <h2 className="text-4xl font-semibold text-gray-800">Our Exclusive Collection</h2>
        <p className="text-gray-600 mt-2">Explore our best-selling designs, curated just for you.</p>

        {filteredAccessories.length === 0 ? (
          <p className="mt-8 text-gray-600">No accessories found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 px-8">
            {filteredAccessories.map((item, index) => (
              <div key={index} className="shadow-lg rounded-lg overflow-hidden">
                <img src={item.imgUrl} alt={item.name} className="w-full h-60 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                  <p className="text-purple-700 font-semibold mt-2">${item.price}</p>
                  <button
                    onClick={() => addToCart(item._id)}
                    className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
