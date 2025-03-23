import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

export default function Paypal({
  userId,
  cartItems,
  totalAmount, 
  deliveryAddress,
  onPaymentSuccess,
  SERVER_URL,
}) {
  return (
    <div className="paypal-button-container">
      <PayPalButtons
        style={{
          layout: "vertical",
          shape: "rect",
          color: "gold",
          label: "pay",
          height: 55,
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Order from Castle Jewel",
                amount: {
                  currency_code: "CAD",
                  value: totalAmount.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          try {
            // Capture the order
            const order = await actions.order.capture();
            console.log("Payment successful:", order);

            // Extract the capture ID
            const captureId = order.purchase_units[0].payments.captures[0].id;

            // Prepare cart items for the backend
            const items = cartItems.map((item) => ({
              accessoryId: item.accessoryId._id,
              quantity: item.quantity,
              price: item.accessoryId.price,
            }));

            // Make API call to backend to verify payment and create order
            const response = await axios.post(`${SERVER_URL}/api/user/web2`, {
              userId,
              items,
              totalAmount,
              deliveryAddress,
              orderId: order.id,
              captureId: captureId,
              status: order.status,
              amount: order.purchase_units[0].amount.value,
              currency: order.purchase_units[0].amount.currency_code,
              payer: order.payer,
            });

            console.log("Server response:", response.data);

            // Trigger callback if provided
            if (onPaymentSuccess) {
              onPaymentSuccess(order, response.data);
            }
          } catch (error) {
            console.error("Error processing payment:", error);
          }
        }}
        onError={(err) => {
          console.error("PayPal Button Error:", err);
        }}
      />
    </div>
  );
}