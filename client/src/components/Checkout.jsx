import React, { useState, useContext } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AddressModal2 from "./AddressModal2";
import { setUserDetail } from "../store/slice/UserDetailSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MainContext from "../context/main";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Paypal from "./Paypal"; // Import the updated Paypal component

const Checkout = () => {
  const [items, setItems] = useState([]);
  const context = useContext(MainContext);
  const { SERVER_URL } = context;
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const navigate = useNavigate();
  const userDetail = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const [addressIsThere, setAddressIsThere] = useState(false);
  const [allowToPay, setAllowToPay] = useState(false);

  const defaultAddress = {
    fullName: "Default User",
    phone: "0000000000",
    addressLine1: "Default Address",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    postalCode: "400001",
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await axios.get(`${SERVER_URL}/api/cart/${userDetail._id}`);
        setItems(cartResponse.data.cart);

        let total = 0;
        cartResponse.data.cart.forEach((item) => {
          total += item.accessoryId.price * item.quantity;
        });
        setTotalAmount(total);

        if (userDetail.deliveryAddress.length > 0) {
          setDeliveryAddress(userDetail.deliveryAddress[0]);
          const isDefaultAddress = Object.keys(defaultAddress).every(
            (key) => userDetail.deliveryAddress[0][key] === defaultAddress[key]
          );
          setAllowToPay(!isDefaultAddress);
          setAddressIsThere(true);
        } else {
          setAllowToPay(false);
          setAddressIsThere(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load cart data");
      }
    };

    fetchData();
  }, [userDetail]);

  const fetchCart = async () => {
    try {
      const cartResponse = await axios.get(`${SERVER_URL}/api/cart/${userDetail._id}`);
      setItems(cartResponse.data.cart);

      let total = 0;
      cartResponse.data.cart.forEach((item) => {
        total += item.accessoryId.price * item.quantity;
      });
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to refresh cart");
    }
  };

  const confirmPayment = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/user/create-order`, {
        userId: userDetail._id,
        items: items.map((item) => ({
          accessoryId: item.accessoryId._id,
          quantity: item.quantity,
          price: item.accessoryId.price,
        })),
        totalAmount,
        deliveryAddress,
        transactionId: "1234567890",
        paymentMethod: "cod",
      });

      await axios.delete(`${SERVER_URL}/api/cart/${userDetail._id}`);
      await fetchCart();

      toast.success("Order created successfully! Payment will be collected on delivery.");
      navigate("/home");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
      await fetchCart();
    }
  };

  const handlePaymentSuccess = async (order, serverResponse) => {
    if (serverResponse.success) {
      toast.success("Payment successful! Order created.");
      navigate("/home");
    } else {
      toast.error("Payment verification failed on the server");
    }
  };

  const handleSave = async (address) => {
    setDeliveryAddress(address);
    setIsModalOpen2(false);

    try {
      const token = sessionStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
      await axios.put(`${SERVER_URL}/api/user/update`, {
        token,
        deliveryAddress: [address],
      });

      dispatch(setUserDetail({ ...userDetail, deliveryAddress: [address] }));
      const isDefaultAddress = Object.keys(defaultAddress).every(
        (key) => address[key] === defaultAddress[key]
      );
      setAllowToPay(!isDefaultAddress);
      setAddressIsThere(true);
      toast.success("Delivery address updated successfully!");
    } catch (err) {
      console.error("Failed to update delivery address:", err);
      toast.error("Failed to update address");
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AQRKTjhM3jpx4BSGtQfmClkDaMyA05-QKxjlXAh62g_B9NJM7pG20Uu1dmEhvPzXvjV0swMCLg-XoyJG", // Sandbox client ID
        currency: "CAD",
      }}
    >
      <div className="max-w-5xl mx-auto my-12 p-8 bg-gradient-to-br from-white to-amber-50 shadow-2xl rounded-3xl">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Checkout</h2>

        {/* Delivery Address */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Delivery Address</h3>
          {deliveryAddress ? (
            <div className="text-gray-700">
              <p className="font-medium">{deliveryAddress.fullName}</p>
              <p>
                {deliveryAddress.addressLine1}, {deliveryAddress.city}, {deliveryAddress.state},{" "}
                {deliveryAddress.country} - {deliveryAddress.postalCode}
              </p>
              <p className="text-sm text-gray-500 mt-1">Phone: {deliveryAddress.phone}</p>
            </div>
          ) : (
            <p className="text-red-500">No delivery address set. Please add one to proceed.</p>
          )}
          <button
            onClick={() => setIsModalOpen2(true)}
            className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            {addressIsThere ? "Edit Address" : "Add Address"}
          </button>
          <AddressModal2
            isOpen={isModalOpen2}
            onClose={() => setIsModalOpen2(false)}
            onSave={handleSave}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
          <div className="mb-6">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.accessoryId._id}
                  className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.accessoryId.imgUrl}
                      alt={item.accessoryId.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className="text-gray-700 font-medium">
                      {item.accessoryId.name} x {item.quantity}
                    </span>
                  </div>
                  <span className="text-gray-800 font-semibold">
                    ${(item.accessoryId.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            )}
          </div>

          {/* Total and Payment Buttons */}
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>Delivery:</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Order Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            {items.length > 0 && allowToPay ? (
              <div className="mt-4 flex flex-col items-center space-y-4">
                <button
                  onClick={confirmPayment}
                  className="px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300"
                >
                  Place Order (Cash on Delivery)
                </button>
                <Paypal
                  userId={userDetail._id}
                  cartItems={items}
                  totalAmount={totalAmount}
                  deliveryAddress={deliveryAddress}
                  onPaymentSuccess={handlePaymentSuccess}
                  SERVER_URL={SERVER_URL}
                />
              </div>
            ) : (
              <p className="text-center text-gray-500">
                {items.length === 0
                  ? "Add items to cart to proceed"
                  : "Add delivery address to proceed"}
              </p>
            )}
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;