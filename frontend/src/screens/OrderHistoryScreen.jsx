import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";

const OrderHistoryScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, orders } = useSelector(
    (state) => state.myOrders || { loading: false, error: null, orders: [] },
  );

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    dispatch(listMyOrders());

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const getStep = (order) => {
    if (order.isDelivered) return 3;
    if (order.isPaid) return 2;
    return 1;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Orders 🧾 :</h2>
      <br></br>

      {/* 🔄 MODERN LOADER */}
      {(loading || showLoader) && (
        <div className="loader-container">
          <div className="dot-spinner">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}></div>
            ))}
          </div>
          <p className="loader-text">
            Loading Your Orders !! Please Wait ⏳⏳...
          </p>
        </div>
      )}

      {/* ❌ ERROR */}
      {!showLoader && error && (
        <h4 className="text-danger text-center">{error}</h4>
      )}

      {/* 😩 EMPTY */}
      {!showLoader && !loading && !error && orders.length === 0 && (
        <div className="empty-box">
          <h1>😩</h1>
          <h3>OOPS !! No Orders Found...</h3>
          <p>Order Something and come back 😃</p>

          <button
            onClick={() => navigate("/")}
            className="btn btn-warning mt-3"
          >
            🛍️ Shop Now
          </button>
        </div>
      )}

      {/* ✅ ORDERS */}
      {!showLoader && !loading && !error && orders.length > 0 && (
        <div className="row">
          {orders.map((order) => {
            const step = getStep(order);

            return (
              <div className="col-md-12 mb-4" key={order.id}>
                <div className="card shadow-sm p-3 rounded-4">
                  {/* HEADER */}
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5>Order #{order.id}</h5>
                      <small>{order.createdAt?.substring(0, 10)}</small>
                    </div>
                    <h5 className="text-success">₹{order.totalPrice}</h5>
                  </div>

                  {/* 🔥 TRACKER */}
                  <div className="tracker">
                    <div className="tracker-line"></div>

                    {/* Ordered */}
                    <div className="tracker-step">
                      <div
                        className="dot"
                        style={{
                          background: step >= 1 ? "#ffc107" : "#ccc",
                        }}
                      ></div>
                      <span>Ordered</span>
                    </div>

                    {/* Paid */}
                    <div className="tracker-step">
                      <div
                        className="dot"
                        style={{
                          background: step >= 2 ? "#0d6efd" : "#ccc",
                        }}
                      ></div>
                      <span>Paid</span>
                    </div>

                    {/* Delivered */}
                    <div className="tracker-step">
                      <div
                        className="dot"
                        style={{
                          background: step >= 3 ? "#28a745" : "#ccc",
                        }}
                      ></div>
                      <span>Delivered</span>
                    </div>
                  </div>

                  <hr />

                  {/* PRODUCTS */}
                  {order.orderItems?.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center mb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        width="70"
                        height="70"
                        style={{
                          objectFit: "contain",
                          borderRadius: "10px",
                          border: "1px solid #eee",
                          padding: "5px",
                        }}
                      />

                      <div className="ms-3 flex-grow-1">
                        <strong>{item.name}</strong>
                        <div>Qty: {item.qty}</div>
                      </div>

                      <div className="fw-bold">₹{item.price}</div>

                      <button
                        onClick={() => navigate(`/product/${item.product}`)}
                        className="view-btn"
                      >
                        View Product →
                      </button>
                    </div>
                  ))}

                  <hr />

                  {/* STATUS */}
                  <div>
                    {order.isDelivered ? (
                      <span className="badge bg-success">Delivered 🚚</span>
                    ) : order.isPaid ? (
                      <span className="badge bg-primary">Shipped 📦</span>
                    ) : (
                      <span className="badge bg-danger">Pending ❌</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryScreen;
