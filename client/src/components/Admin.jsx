import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiTrash, FiPlus } from "react-icons/fi";
import MainContext from "../context/main";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(MainContext)
  const {SERVER_URL} = context
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (type) => {
    setLoading(true);
    setError(null);

    let url;
    switch (type) {
      case "Dashboard":
        url = `${SERVER_URL}/api/accessories/all`; // Product API (unchanged)
        break;
      case "Orders": 
        url = `${SERVER_URL}/api/user/orders/all`; // Updated to match new route
        break;
      case "Users":
        url = `${SERVER_URL}/api/user/all`; // Users API (unchanged)
        break;
      default:
        url = "";
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${type.toLowerCase()}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <h1 className="text-xl font-bold mb-6">LuxeGems Admin</h1>
        <nav>
          <ul className="space-y-4">
            {["Dashboard", "Orders", "Users"].map((tab) => (
              <li
                key={tab}
                className={`cursor-pointer font-semibold ${
                  activeTab === tab ? "text-blue-600" : "text-gray-500"
                } hover:text-blue-500 transition-colors`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">{activeTab}</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-700">
            {activeTab === "Dashboard"
              ? "Product Management"
              : activeTab === "Orders"
              ? "Order Management"
              : "User Management"}
          </h3>

          {/* Add & Remove Buttons (Only for Products) */}
          {activeTab === "Dashboard" && (
            <div className="flex space-x-4 mb-6">
              <Link
                to="/add-product"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <FiPlus /> <span>Add Product</span>
              </Link>
              <Link
                to="/remove-product"
                className="bg-red-600 text-white px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors"
              >
                <FiTrash /> <span>Remove Product</span>
              </Link>
            </div>
          )}

          {/* Data Table */}
          {loading ? (
            <p className="text-gray-600 text-center">Loading {activeTab.toLowerCase()}...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Error: {error}</p>
          ) : (
            <table className="w-full bg-white rounded-lg overflow-hidden border border-gray-200">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  {activeTab === "Dashboard" ? (
                    <>
                      <th className="p-4 text-left font-semibold text-gray-700">Name</th>
                      <th className="p-4 text-left font-semibold text-gray-700">Category</th>
                      <th className="p-4 text-left font-semibold text-gray-700">Price</th>
                    </>
                  ) : activeTab === "Orders" ? (
                    <>
                      <th className="p-4 text-left font-semibold text-gray-700">Order ID</th>
                      <th className="p-4 text-left font-semibold text-gray-700">Customer</th>
                      <th className="p-4 text-left font-semibold text-gray-700">Total</th>
                      <th className="p-4 text-left font-semibold text-gray-700">Status</th>
                      <th className="p-4 text-left font-semibold text-gray-700">Date</th>
                    </>
                  ) : (
                    <>
                      <th className="p-4 text-left font-semibold text-gray-700">User ID</th>
                      <th className="p-4 text-left font-semibold text-gray-700">Name</th>
                      <th className="p-4 text-left font-semibold text-gray-700">Email</th>
                      <th className="p-4 text-left font-semibold text-gray-700">ThirdPartyLogin</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item) =>
                    activeTab === "Dashboard" ? (
                      <tr
                        key={item._id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 text-gray-700">{item.name}</td>
                        <td className="p-4 text-gray-500">{item.category}</td>
                        <td className="p-4 font-bold text-blue-600">${item.price}</td>
                      </tr>
                    ) : activeTab === "Orders" ? (
                      <tr
                        key={item._id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 text-gray-700">{item._id}</td>
                        <td className="p-4 text-gray-500">{item.userId?.name || "Unknown"}</td>
                        <td className="p-4 font-bold text-blue-600">${item.totalAmount?item.totalAmount.toFixed(2):""}</td>
                        <td
                          className={`p-4 font-semibold ${
                            item.status === "Delivered"
                              ? "text-green-600"
                              : item.status === "Shipped"
                              ? "text-blue-600"
                              : item.status === "Processing"
                              ? "text-yellow-600"
                              : item.status === "Pending"
                              ? "text-orange-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.status}
                        </td>
                        <td className="p-4 text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ) : (
                      <tr
                        key={item._id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 text-gray-700">{item._id}</td>
                        <td className="p-4 text-gray-500">{item.name}</td>
                        <td className="p-4 font-semibold text-blue-600">{item.email}</td>
                        <td className="p-4 font-semibold">{item.thirdPartyLogin ? "Yes" : "No"}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={activeTab === "Orders" ? 5 : 4} className="p-4 text-gray-500 text-center">
                      No {activeTab.toLowerCase()} found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;