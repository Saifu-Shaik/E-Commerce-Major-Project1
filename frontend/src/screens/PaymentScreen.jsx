import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod] = useState("Cash on Delivery");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="container mt-4">
      {/* 🔙 BACK */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <CheckoutSteps step1 step2 step3 />

      {/* 🔥 PREMIUM CARD */}
      <div
        style={{
          maxWidth: "950px",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 5px 25px rgba(0,0,0,0.1)",
          background: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "25px" }}>
          Select Your Payment Method 🔒
        </h2>

        <form onSubmit={submitHandler}>
          {/* 💰 COD OPTION */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "25px",
              background: "#fafafa",
            }}
          >
            <div className="d-flex align-items-center">
              <input type="radio" checked readOnly />

              <div style={{ marginLeft: "15px", textAlign: "left" }}>
                <h5 style={{ margin: 0 }}>Cash on Delivery (COD) ✅</h5>
                <small style={{ color: "#666" }}>
                  Pay when your order arrives at your doorstep
                </small>
              </div>
            </div>

            <i
              className="bi bi-cash-coin"
              style={{ fontSize: "28px", color: "green" }}
            ></i>
          </div>

          {/* 🚚 REAL DELIVERY IMAGE (UPDATED 🔥) */}
          <div style={{ marginTop: "20px" }}>
            <img
              src="https://img.freepik.com/free-vector/delivery-service-illustration_23-2148505081.jpg"
              alt="cod delivery"
              style={{
                width: "100%",
                maxWidth: "450px",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* 📝 TEXT */}
          <h5 style={{ marginTop: "20px", fontWeight: "600" }}>
            Your order will be delivered safely 🚚
          </h5>

          <p style={{ color: "#555", marginBottom: "10px" }}>
            Pay with cash at your doorstep. No advance payment required.
          </p>

          {/* 🔐 TRUST BADGES */}
          <div
            className="d-flex justify-content-center gap-4 mt-3 flex-wrap"
            style={{ fontSize: "14px", color: "#444" }}
          >
            <span>🔒 Secure Payments</span>
            <span>🛡️ Trusted Shopping</span>
            <span>✅ Buyer Protection</span>
          </div>

          {/* 🚀 BUTTON */}
          <div className="mt-4">
            <button
              type="submit"
              style={{
                background: "#f7c600",
                color: "#000",
                border: "none",
                padding: "12px 40px",
                borderRadius: "30px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Place Order →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
