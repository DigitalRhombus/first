import React, { useState } from "react";

const LoginPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login details:", { email, password });
    // Call API or handle authentication logic here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-md mb-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-md mb-2"
            required
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded-md">
            Login
          </button>
        </form>
        <button onClick={onClose} className="mt-3 text-red-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
