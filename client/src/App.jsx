import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { setUserDetail } from "./store/slice/UserDetailSlice";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import JewelleryHome from "./components/JewelleryHome";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import AppNavbar from "./components/AppNavbar";
import MainContext from "./context/main";
import Loading from "./components/Loading";
import Error from "./components/Error";
import PaymentSuccess from "./components/PaymentSuccess";
import Profile from "./components/UserProfile";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/Admin";
import RemoveProductPopup from "./components/RemoveProductPopup";
import AddProductPopup from "./components/AddProductPopup";
import ContactUs from "./components/contact";
import Paypal from "./components/Paypal";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userDetail = useSelector((state) => state.userDetail);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loadDataTokenToUserDetail = async (token) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/user/tokentodata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const jsonData = await response.json();
      if (jsonData.success) {
        dispatch(setUserDetail({ ...jsonData.result }));
        return true;
      }
    } catch (error) {
      console.error("Error verifying token:", error);
    }
    return false;
  };

  useEffect(() => {
    const verifyAuthentication = async () => {
      const token = sessionStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

      if (token) {
        const success = await loadDataTokenToUserDetail(token);
        setIsAuthenticated(success);
        if (!success) {
          navigate("/");
        }
      } else if (!userDetail.token) {
        navigate("/");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    verifyAuthentication();
  }, [userDetail.token, location.pathname]);

  if (loading) {
    return <Loading />;
  }

if(!isAuthenticated) toast.error("Unauthorized Access")

  return isAuthenticated ? children : <JewelleryHome />;
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (

    <MainContext.Provider value={{ SERVER_URL }}>
      <BrowserRouter>
        <AppNavbar setSearchQuery={setSearchQuery}/>
        <Routes>
          <Route exact path="/" element={<JewelleryHome />} />
          <Route exact path="/load" element={<Loading />} />
            {/* <Route exact path="/home" element={<Home />} /> */}
            <Route path="/home" element={<ProtectedRoute><Home searchQuery={searchQuery}/></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /> </ProtectedRoute>} />
                              <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactUs />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/last" element={<Paypal />} />
          <Route path="/add-product" element={<AddProductPopup />} />
          <Route path="/remove-product" element={<RemoveProductPopup />} />
          {/* <Route path="/pratice/:course/:problemid" element={<ProtectedRoute><SolvedPraticeProblem /></ProtectedRoute>} /> */}
          <Route path="/404" element={<Error />} />

          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MainContext.Provider>

  );
}

export default App;
