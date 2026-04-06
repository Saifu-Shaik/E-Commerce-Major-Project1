import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/orderActions";

const OrderHistoryScreen = () => {
  const dispatch = useDispatch();

  // ✅ Safe selector (prevents undefined crash)
  const { loading, error, orders } = useSelector(
    (state) => state.myOrders || { loading: false, error: null, orders: [] },
  );

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>My Orders : </h2>
      <br></br>

      {/* 🔄 Loading */}
      {loading && <h4>Loading...</h4>}

      {/* ❌ Error */}
      {error && <h4 className="text-danger">{error}</h4>}

      {/* 📭 No Orders */}
      {!loading && !error && orders.length === 0 && <h4>No Orders Found</h4>}

      {/* ✅ Orders Table */}
      {!loading && !error && orders.length > 0 && (
        <table className="table table-bordered table-striped">
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
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>

                <td>
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>

                <td>₹{order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    <span className="text-success fw-bold">Yes</span>
                  ) : (
                    <span className="text-danger">No</span>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    <span className="text-success fw-bold">Yes</span>
                  ) : (
                    <span className="text-warning">Pending</span>
                  )}
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
