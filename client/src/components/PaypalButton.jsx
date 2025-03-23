import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { toast } from "react-toastify";
import MainContext from "../context/main";

const PaypalButton = ({
  amount,
  items,
  deliveryAddress,
  userId,
  navigate,
  setitems,
  setTotalAmount,
}) => {
  const context = useContext(MainContext)
  const {SERVER_URL} = context
  return (
    <PayPalButtons
      createOrder={async (data, actions) => {
        try {
          console.log("Creating PayPal order with data:", {
            userId,
            items,
            totalAmount: amount,
            deliveryAddress,
          });
          const response = await axios.post(
            `${SERVER_URL}/api/user/create-paypal-order`,
            {
              userId,
              items,
              totalAmount: amount,
              deliveryAddress,
            }
          );
          if (response.data.success) {
            console.log("PayPal Order ID:", response.data.orderId);
            return response.data.orderId;
          } else {
            throw new Error("Failed to create PayPal order");
          }
        } catch (error) {
          console.error("Error creating PayPal order:", error);
          toast.error("Failed to initiate payment");
          throw error;
        }
      }}
      onApprove={async (data, actions) => {
        try {
          console.log("Capturing PayPal order with ID:", data.orderID);
          const response = await axios.post(
            `${SERVER_URL}/api/user/capture-paypal-order`,
            {
              orderId: data.orderID,
            }
          );
          if (response.data.success) {
            setitems([]);
            setTotalAmount(0);
            toast.success("Payment Successful!");
            navigate("/payment-success", { state: { order: response.data.dbOrder } });
          } else {
            throw new Error("Failed to capture payment");
          }
        } catch (error) {
          console.error("Error capturing payment:", error);
          toast.error("Payment Failed");
          throw error;
        }
      }}
      onError={(err) => {
        console.error("PayPal Payment Error:", err);
        toast.error("Payment Failed");
      }}
      style={{ layout: "vertical" }}
    />
  );
}; 


export default PaypalButton;