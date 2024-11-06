import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUserRole } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl = `${url}/api/user/login`;
    } else {
      newUrl = `${url}/api/user/register`;
    }

    const res = await axios.post(newUrl, data);
    if (res.data.success) {
      console.log(res.data);
      setToken(res.data.token);
      setUserRole(res.data.user.role);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.user.role);
      setShowLogin(false);
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={data?.name}
              onChange={onChangeHandler}
            />
          )}
          <input
            type="text"
            placeholder="Email"
            required
            name="email"
            value={data?.email}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={data?.password}
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-consition">
          <input type="checkbox" required />
          <p>
            By continuing, i agree to the Terms of Service and Privacy Policy
          </p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new Account?
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an Account?
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
