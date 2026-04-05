import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/orderActions";
import { Link } from "react-router-dom";

const OrderHistoryScreen = () => {
  const dispatch = useDispatch();

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      {loading ? (
        <h4>Loading...</h4>
      ) : error ? (
        <h4>{error}</h4>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
            </tr>
          </thead>

          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order._id || order.id}</td>
                  <td>{order.createdAt?.substring(0, 10)}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? "Yes" : "No"}
                  </td>
                  <td>
                    {order.isDelivered ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistoryScreen;