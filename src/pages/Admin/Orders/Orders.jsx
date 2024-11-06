/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Orders.css";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) {
        setOrders(res.data.data);
        console.log(res.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (e, orderId) => {
    const res = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: e.target.value,
    });
    if (res.data.success) {
      toast.success(res.data.message);
      await getOrders();
    } else {
      toast.error(res.data.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.name}</p>
              <p className="order-item-address">{order.address.address}</p>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(e) => updateOrderStatus(e, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out of delivery">Out of delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
