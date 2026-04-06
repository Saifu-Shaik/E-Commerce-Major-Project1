import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";

const OrderHistoryScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, orders } = useSelector(
    (state) => state.myOrders || { loading: false, error: null, orders: [] },
  );

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>My Orders :</h2>
      <br />

      {/* 🔄 Loading */}
      <br></br>
      {loading && <h4>Loading Your Orders ! Please Wait ⏳⏳... . .</h4>}

      {/* ❌ Error */}
      {error && <h4 className="text-danger">{error}</h4>}

      {/* 😩 EMPTY STATE */}
      {!loading && !error && orders.length === 0 && (
        <div
          style={{
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "70px" }}>😩</h1>

          <h2 style={{ fontWeight: "700", marginTop: "10px" }}>
            OOPS !! No Orders Found...
          </h2>

          <p style={{ fontSize: "18px", color: "#555", marginTop: "10px" }}>
            Order Something and get back to this Page 😃
          </p>

          {/* 🛒 SHOP NOW BUTTON */}
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "20px",
              padding: "10px 25px",
              fontSize: "16px",
              borderRadius: "25px",
              border: "none",
              backgroundColor: "#f7c600",
              color: "#000",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e6b800")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f7c600")}
          >
            🛍️ Shop Now
          </button>
        </div>
      )}

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
