import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders } from "../actions/adminActions";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AdminOrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logged in user
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Orders state
  const adminOrders = useSelector((state) => state.adminOrders);
  const { loading, error, orders } = adminOrders;

  // Update state (refresh after update)
  const adminOrderUpdate = useSelector((state) => state.adminOrderUpdate);
  const { success: updateSuccess } = adminOrderUpdate;

  /*
  =========================================================
  SECURITY CHECK
  =========================================================
  */
  useEffect(() => {
    // Not logged in
    if (!userInfo) {
      navigate("/login");
      return;
    }

    // Not admin
    if (!userInfo.isAdmin) {
      navigate("/");
      return;
    }

    // Load orders
    dispatch(getAdminOrders());
  }, [dispatch, navigate, userInfo, updateSuccess]);

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/admin/dashboard")}
      >
        ⬅ Back
      </button>

      <h2 className="mb-3">Admin – Order Management</h2>

      {/* Loading */}
      {loading && <Loader />}

      {/* Error */}
      {error && (
        <Message variant="danger">
          {typeof error === "string"
            ? error
            : error?.detail || "Failed to load orders"}
        </Message>
      )}

      {/* Empty */}
      {!loading && !error && orders?.length === 0 && (
        <Message>No orders found</Message>
      )}

      {/* Table */}
      {!loading && !error && orders?.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>

                  <td>{order.user?.username || "—"}</td>
                  <td>{order.user?.email || "—"}</td>

                  <td>₹{order.totalPrice}</td>

                  <td>
                    {order.isPaid ? (
                      <span className="badge bg-success">Paid</span>
                    ) : (
                      <span className="badge bg-danger">Not Paid</span>
                    )}
                  </td>

                  <td>
                    {order.isDelivered ? (
                      <span className="badge bg-success">Delivered</span>
                    ) : (
                      <span className="badge bg-warning">Pending</span>
                    )}
                  </td>

                  <td>
                    <Link to={`/admin/order/${order.id}/edit`}>
                      <button className="btn btn-primary btn-sm">
                        <i className="fa-solid fa-pen-to-square me-1"></i>
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrderListScreen;
