import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>No.</p>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quatity</p>
          <p>Total</p>
          <p>Remoce</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item?._id] > 0) {
            return (
              <>
                <div className="cart-items-title cart-items-item">
                  <p>{index + 1}</p>
                  <img src={url + "/images/" + item?.image} alt="" />
                  <p>{item?.name}</p>
                  <p>${item?.price}</p>
                  <p>{cartItems[item?._id]}</p>
                  <p>${item?.price * cartItems[item?._id]}</p>
                  <p
                    onClick={() => removeFromCart(item?._id)}
                    className="cross"
                  >
                    x
                  </p>
                </div>
                <hr />
              </>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-discount">
          <div>
            <p>If you have a discount code, enter it here</p>
            <div className="cart-discount-input">
              <input type="text" placeholder="Enter discount code" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
