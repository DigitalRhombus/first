import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import Navbar1 from "./Navbar1";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetail } from "../store/slice/UserDetailSlice";
// import { object, string } from "yup";
import { signInWithGoogle } from "./firebase";
import { Button } from "react-bootstrap";
import Img1 from "../assets/logincard.webp";

import Img2 from "../assets/registercard.webp";
import HeroImage from "../assets/JewelHome.webp";
import Product1 from "../assets/logincard.webp";
import Product2 from "../assets/logincard.webp";
import Product3 from "../assets/logincard.webp";
import { object, string } from "yup";
import MainContext from "../context/main";
export default function JewelleryHome() {
  const navigate = useNavigate();
  const context = useContext(MainContext);
  const { SERVER_URL } = context;
  const dispatch = useDispatch();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  useEffect(() => {
    console.log(registerData);
  }, [registerData]);
  useEffect(() => {
    console.log(loginData);
  }, [loginData]);

  // Validation Schema using yub
  const loginSchema = object({
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
  });

  const registerSchema = object({
    name: string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
    age: string().required("Age is required"),
  });

  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    console.log("user-", user?.email);

    if (user) {
      let result = await fetch(`${SERVER_URL}/api/user/thirdpartylogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });
      let jsonData = await result.json();
      console.log("res---", jsonData);
      if (jsonData.success) {
        console.log(jsonData.result);
        console.log(jsonData.user);
        setIsLoginOpen(false);
        dispatch(setUserDetail(jsonData.result));
        setIsRegisterOpen(false);
        sessionStorage.setItem("token", JSON.stringify(jsonData.authToken));
        navigate("/home");
        toast.success("Welcome");
      }
    }
  };
  // Handle Login
  const handleLogin = async () => {
    try {
      console.log(SERVER_URL);
      await loginSchema.validate(loginData);
      const response = await axios.post(
        `${SERVER_URL}/api/user/login`,
        loginData
      );
      if (response.data.success) {
        sessionStorage.setItem(
          "token",
          JSON.stringify(response.data.authToken)
        );
        console.log("token", JSON.stringify(response.data.authToken));
        // dispatch(setUserDetail(response.data.body));
        setIsLoginOpen(false);
        dispatch(setUserDetail(response.data.result));

        toast.success("Login successful!");
        navigate("/home");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  };

  // Handle Register
  const handleRegister = async () => {
    try {
      console.log(SERVER_URL);
      await registerSchema.validate(registerData);
      const response = await axios.post(
        `${SERVER_URL}/api/user/register`,
        registerData
      );
      if (response.data.success) {
        sessionStorage.setItem(
          "token",
          JSON.stringify(response.data.authToken)
        );
        console.log("token", JSON.stringify(response.data.authToken));
        // dispatch(setUserDetail(response.data.body));
        setIsRegisterOpen(false);
        dispatch(setUserDetail(response.data.result));

        toast.success("Register successful!");
        navigate("/home");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  };

  return (
    <>
      {" "}
      <div className="bg-white"></div>
      <div className="">
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center h-[700px] flex flex-col items-center justify-center text-white text-center"
          style={{ backgroundImage: `url(${HeroImage})` }}
        >
          <h1 className="text-5xl font-bold text-black drop-shadow-lg">
            Timeless Elegance, Crafted for You
          </h1>
          <p className="mt-4 text-lg text-black drop-shadow-lg">
            Discover exquisite collections of fine jewellery, crafted with
            perfection to suit every occasion.
          </p>
          <div className="mt-6">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg drop-shadow-lg hover:bg-blue-700 mr-4"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </button>
            <button
              className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg drop-shadow-lg hover:bg-gray-300"
              onClick={() => setIsRegisterOpen(true)}
            >
              Register
            </button>
          </div>
        </div>

        {/* Featured Collection */}
        <section className="py-16 text-center">
          <h2 className="text-4xl font-semibold text-gray-800">
            Our Exclusive Collection
          </h2>
          <p className="text-gray-600 mt-2">
            Explore our best-selling designs, curated just for you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 px-8">
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img
                src={Product1}
                alt="Jewellery 1"
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Elegant Gold Necklace</h3>
                <p className="text-gray-600 mt-2">
                  A timeless beauty to adorn your elegance.
                </p>
              </div>
            </div>
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img
                src={Product2}
                alt="Jewellery 2"
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Diamond Ring</h3>
                <p className="text-gray-600 mt-2">
                  Perfect for every occasion.
                </p>
              </div>
            </div>
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img
                src={Product3}
                alt="Jewellery 3"
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Sapphire Earrings</h3>
                <p className="text-gray-600 mt-2">
                  Exquisite and dazzling craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Login Popup */}
        {isLoginOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            style={{ zIndex: 2 }}
          >
            <div className="bg-white flex rounded-lg shadow-lg w-[70wh] h-[70vh]" style={{overflowY:"scroll"}}>
              <div
                className="w-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${Img1})`, width: "50%" }}
              />
              <div className="w-1/2 p-8 relative">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-black"
                  onClick={() => setIsLoginOpen(false)}
                >
                  ✖
                </button>
                <h2 className="text-2xl font-bold text-blue-600">Login</h2>
                <input
                  type="email"
                  placeholder="Enter E-Mail ID"
                  className="w-full p-3 mt-4 border rounded"
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full p-3 mt-2 border rounded"
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <button
                  className="w-full mt-4 bg-blue-500 text-white py-3 rounded"
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Continue
                </button>

                <div className="mt-4">
                  <Button
                    onClick={handleGoogleLogin}
                    style={{
                      marginTop: "0.3rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      backgroundColor: "white",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      padding: "10px 10px",
                      fontSize: "13px",
                      cursor: "pointer",
                      width: "100%",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      color: "black",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="20"
                      height="20"
                    >
                      <path
                        fill="#4285F4"
                        d="M24 9.5c3.67 0 6.31 1.45 8.2 2.67l6.1-6.1C34.78 3.46 29.93 1.5 24 1.5 14.92 1.5 7.26 7.08 4 14.5l7.1 5.5C12.61 14.4 17.83 9.5 24 9.5z"
                      />
                      <path
                        fill="#34A853"
                        d="M46.1 24.5c0-1.35-.12-2.64-.35-3.89H24v7.89h12.7c-.58 2.89-2.32 5.32-4.83 6.99l7.1 5.5c4.17-3.84 6.3-9.51 6.3-16.49z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.9 28.5c-1.26-3.77-1.26-7.99 0-11.76l-7.1-5.5c-3.09 6.14-3.09 13.12 0 19.26l7.1-5.5z"
                      />
                      <path
                        fill="#EA4335"
                        d="M24 46.5c5.93 0 10.78-1.96 14.3-5.5l-7.1-5.5c-2 1.37-4.56 2.18-7.2 2.18-6.17 0-11.39-4.9-12.9-11.5l-7.1 5.5c3.26 7.42 10.92 12.99 19 12.99z"
                      />
                    </svg>

                    {/* Sign-in Text */}
                    <span
                      style={{
                        flexGrow: 1,
                        textAlign: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      Sign in with Google
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Register Popup */}
        {isRegisterOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            style={{ zIndex: 2 }}
          >
            <div className="bg-white flex rounded-lg shadow-lg w-[70wh] h-[70vh]" style={{overflowY:"scroll"}}>
              <div
                className="w-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${Img2})`, width: "50%" }}
              />
              <div className="w-1/2 p-8 relative">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-black"
                  onClick={() => setIsRegisterOpen(false)}
                >
                  ✖
                </button>
                <h2 className="text-2xl font-bold text-blue-600">Register</h2>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full p-3 mt-4 border rounded"
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Enter Age"
                  className="w-full p-3 mt-4 border rounded"
                  onChange={(e) =>
                    setRegisterData({ ...registerData, age: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Enter E-Mail ID"
                  className="w-full p-3 mt-2 border rounded"
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full p-3 mt-2 border rounded"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                />
                <button
                  className="w-full mt-4 bg-blue-500 text-white py-3 rounded"
                  onClick={() => {
                    handleRegister();
                  }}
                >
                  Sign Up
                </button>

                <div className="mt-4">
                  <Button
                    onClick={handleGoogleLogin}
                    style={{
                      marginTop: "0.3rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      backgroundColor: "white",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      padding: "10px 10px",
                      fontSize: "13px",
                      cursor: "pointer",
                      width: "100%",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      color: "black",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="20"
                      height="20"
                    >
                      <path
                        fill="#4285F4"
                        d="M24 9.5c3.67 0 6.31 1.45 8.2 2.67l6.1-6.1C34.78 3.46 29.93 1.5 24 1.5 14.92 1.5 7.26 7.08 4 14.5l7.1 5.5C12.61 14.4 17.83 9.5 24 9.5z"
                      />
                      <path
                        fill="#34A853"
                        d="M46.1 24.5c0-1.35-.12-2.64-.35-3.89H24v7.89h12.7c-.58 2.89-2.32 5.32-4.83 6.99l7.1 5.5c4.17-3.84 6.3-9.51 6.3-16.49z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.9 28.5c-1.26-3.77-1.26-7.99 0-11.76l-7.1-5.5c-3.09 6.14-3.09 13.12 0 19.26l7.1-5.5z"
                      />
                      <path
                        fill="#EA4335"
                        d="M24 46.5c5.93 0 10.78-1.96 14.3-5.5l-7.1-5.5c-2 1.37-4.56 2.18-7.2 2.18-6.17 0-11.39-4.9-12.9-11.5l-7.1 5.5c3.26 7.42 10.92 12.99 19 12.99z"
                      />
                    </svg>

                    {/* Sign-Up Text */}
                    <span
                      style={{
                        flexGrow: 1,
                        textAlign: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      Sign Up with Google
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
