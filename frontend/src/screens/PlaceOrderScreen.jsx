import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error } = orderCreate;

  // Calculate totals
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  cart.shippingPrice = cart.itemsPrice > 500 ? 0 : 40;
  cart.taxPrice = Number((0.18 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    const orderData = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    };

    dispatch(createOrder(orderData));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [success, navigate]);

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://i.imgur.com/Qp7QZ8G.png";
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <h2>Place Order Confirmation 📦🎉:</h2>
      <br></br>

      <div className="row">
        <div className="col-md-8">
          <h4>Shipping Adress 🆓🚚 :</h4>

          <p className="mt-4">
            {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>
          <br></br>

          <h4>Payment Method Selected 💵 :</h4>
          <p className="mt-4"> 🔴 {cart.paymentMethod} 💵</p>
          <br></br>

          <h4>Order Items 📦 :</h4>
          <br></br>

          {cart.cartItems.length === 0 ? (
            <Message>No items in cart.</Message>
          ) : (
            cart.cartItems.map((item) => (
              <div key={item.product} className="d-flex p-2 border-bottom">
                <img
                  src={item.image || "https://i.imgur.com/Qp7QZ8G.png"}
                  alt={item.name}
                  width="60"
                  referrerPolicy="no-referrer"
                  onError={handleImgError}
                  style={{ objectFit: "contain" }}
                />
                <div className="ms-3">
                  <strong>{item.name}</strong>
                  <p>
                    {item.qty} × ₹{item.price} = ₹{item.qty * item.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h4>Order Summary 📜 :</h4>

            <p className="mt-2">Items Total: ₹{cart.itemsPrice}</p>
            <p className="mt-1">Shipping: ₹{cart.shippingPrice}</p>
            <p className="mt-2">Tax: ₹{cart.taxPrice}</p>
            <br></br>
            <h5>Total: ₹{cart.totalPrice}</h5>

            <button
              className="btn btn-primary w-100 mt-3"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              {loading ? "Placing Order..." : "✅ Place Order"}
            </button>
          </div>
        </div>
      </div>

      {success && (
        <div className="text-center mt-3">
          <Loader />
          <p>Hurray!! Order placed successfully 🎉🎉! Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default PlaceOrderScreen;
