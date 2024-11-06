import React, { useContext, useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/User/Home/Home.jsx";
import { Cart } from "./pages/User/Cart/Cart";
import PlaceOrder from "./pages/User/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/User/Verify/Verify";
import MyOrders from "./pages/User/MyOrders/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SlideBar from "./components/SlideBar/SlideBar";
import Add from "./pages/Admin/Add/Add";
import List from "./pages/Admin/List/List";
import Orders from "./pages/Admin/Orders/Orders";
import { StoreContext } from "./context/StoreContext";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { userRole } = useContext(StoreContext);
  const url = "http://localhost:4000";

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      {userRole === "admin" ? (
        <>
          <ToastContainer />
          <Navbar setShowLogin={setShowLogin} userRole={userRole} />
          <hr />
          <div className="app-content">
            <SlideBar />
            <Routes>
              <Route path="/" element={<Navigate to="/add" replace />} />
              <Route path="/add" element={<Add url={url} />} exact />
              <Route path="/list" element={<List url={url} />} exact />
              <Route path="/orders" element={<Orders url={url} />} exact />
            </Routes>
          </div>
        </>
      ) : (
        <div className="App">
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </div>
      )}

      <Footer />
    </>
  );
};

export default App;
