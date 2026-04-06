import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { userInfo } = useSelector((state) => state.userLogin);

  const checkoutHandler = () => {
    if (!userInfo) {
      toast.error("Please login or register first to continue checkout.");
      navigate("/login");
      return;
    }
    navigate("/shipping");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://i.imgur.com/Qp7QZ8G.png";
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h1 className="mt-2">Shopping Cart 🛒 :</h1>
      <br />

      {/* 😩 EMPTY CART UI */}
      {cartItems.length === 0 ? (
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
          <h1 style={{ fontSize: "70px" }}>😔</h1>

          <h2 style={{ fontWeight: "700", marginTop: "10px" }}>
            Your Cart Looks Empty
          </h2>

          <p style={{ fontSize: "18px", color: "#555", marginTop: "10px" }}>
            Buy Something And Fill Your Cart Fast !! 🤩
          </p>

          {/* 🛍️ SHOP NOW BUTTON */}
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
      ) : (
        <div className="row">
          {/* Cart Items */}
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="d-flex align-items-center mb-3 border p-2 rounded"
              >
                <img
                  src={item.image || "https://i.imgur.com/Qp7QZ8G.png"}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  onError={handleImgError}
                  width="80"
                  height="80"
                  style={{ objectFit: "contain", borderRadius: "5px" }}
                />

                <div className="ms-3 flex-grow-1">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>

                <div className="me-3 fw-bold">₹{item.price}</div>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => dispatch(removeFromCart(item.product))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="col-md-4">
            <div className="card p-3">
              <h4>Subtotal ({totalItems}) items</h4>

              <h5 className="text-success">₹{totalPrice}</h5>

              <button
                className="btn btn-primary w-100"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
