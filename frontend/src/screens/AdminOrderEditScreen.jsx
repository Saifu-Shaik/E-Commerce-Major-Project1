

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders, updateAdminOrder } from "../actions/adminActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams, useNavigate } from "react-router-dom";

const AdminOrderEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const adminOrders = useSelector((state) => state.adminOrders);
  const { loading, error, orders } = adminOrders;

  const adminOrderUpdate = useSelector((state) => state.adminOrderUpdate);
  const { success, error: updateError } = adminOrderUpdate;


  const order = useMemo(() => {
    return orders?.find((o) => o.id === Number(id));
  }, [orders, id]);

  
  useEffect(() => {
    dispatch(getAdminOrders());
  }, [dispatch, success]);

 
  const markPaid = () => {
    dispatch(updateAdminOrder(order.id, { isPaid: true }));
  };

  
  const markDelivered = () => {
    if (!order.isPaid) {
      alert("❌ Order must be PAID before marking as Delivered");
      return;
    }
    dispatch(updateAdminOrder(order.id, { isDelivered: true }));
  };

 
  if (loading || !order) return <Loader />;

  return (
    <div className="container mt-4">
      <h2>Update Order #{order.id}</h2>

    
      {error && <Message variant="danger">{error}</Message>}
      {updateError && <Message variant="danger">{updateError}</Message>}

      
      {success && (
        <Message variant="success">Order Updated Successfully</Message>
      )}

      <table className="table table-bordered mt-3">
        <tbody>
          <tr>
            <th>User</th>
            <td>{order.user?.username || "-"}</td>
          </tr>

          <tr>
            <th>Email</th>
            <td>{order.user?.email || "-"}</td>
          </tr>

          <tr>
            <th>Total Price</th>
            <td>₹{order.totalPrice}</td>
          </tr>

          <tr>
            <th>Paid</th>
            <td>{order.isPaid ? "Yes" : "No"}</td>
          </tr>

          <tr>
            <th>Delivered</th>
            <td>{order.isDelivered ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      
      <div className="mt-3">
        {!order.isPaid && (
          <button className="btn btn-primary me-2" onClick={markPaid}>
            Mark as Paid
          </button>
        )}

        {!order.isDelivered && (
          <button
            className="btn btn-success me-2"
            onClick={markDelivered}
            disabled={!order.isPaid}
          >
            Mark as Delivered
          </button>
        )}

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/orders")}
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default AdminOrderEditScreen;
