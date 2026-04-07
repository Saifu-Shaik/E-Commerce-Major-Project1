import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
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

      {/* 😩 EMPTY CART */}
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

          <h2 style={{ fontWeight: "700" }}>Your Cart Looks Empty</h2>

          <p style={{ fontSize: "18px", color: "#555" }}>
            Buy Something And Fill Your Cart Fast !! 🤩
          </p>

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
            }}
          >
            🛍️ Shop Now
          </button>
        </div>
      ) : (
        <>
          <div className="row">
            {/* CART ITEMS */}
            <div className="col-md-8">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="d-flex align-items-center mb-3 border p-2 rounded"
                >
                  <img
                    src={item.image || "https://i.imgur.com/Qp7QZ8G.png"}
                    alt={item.name}
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

            {/* SUMMARY */}
            <div className="col-md-4">
              <div className="card p-3">
                <h4>Subtotal ({totalItems}) Items :</h4>
                <h5 className="text-success mt-3">₹{totalPrice}</h5>

                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout 🎯
                </button>
              </div>
            </div>
          </div>

          {/* 🔥 PREMIUM SECTION */}
          <div className="text-center mt-5">
            {/* CONTINUE SHOPPING */}
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "8px 20px",
                borderRadius: "30px",
                border: "1px solid #ccc",
                background: "#f7c600",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              ✙ Add More Products ....
            </button>
            <br></br>
            <br></br>
            {/* ✅ SIDE BY SIDE IMAGES */}
            <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap mt-4">
              <img
                src="https://res.cloudinary.com/df0vnwmqc/image/upload/v1775554517/Screenshot_2026-04-07_145723_pryvdz.png"
                alt="free delivery"
                style={{ width: "130px", objectFit: "contain" }}
              />

              <img
                src="https://res.cloudinary.com/df0vnwmqc/image/upload/v1775554478/Screenshot_2026-04-07_150425_xkmccr.png"
                alt="trust"
                style={{ width: "150px", objectFit: "contain" }}
              />

              <img
                src="https://res.cloudinary.com/df0vnwmqc/image/upload/v1775554480/Screenshot_2026-04-07_150001_yztlcb.png"
                alt="delivery"
                style={{ width: "140px", objectFit: "contain" }}
              />
            </div>

            {/* TEXT */}
            <h5 style={{ marginTop: "20px", color: "#666" }}>
              🚚 Fast Delivery | 🔒 Secure Orders | 💯 Trusted Shopping
            </h5>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
