import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { Link, useNavigate } from "react-router-dom";
import { getImageURL } from "../utils/imageHelper";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

 
  const checkoutHandler = () => {
    if (!userInfo) {
      alert("Please login or register first to continue checkout.");
      navigate("/login");
      return;
    }

    navigate("/shipping");
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <br></br>
      <h1>Shopping Cart 🛒</h1>
      <br></br>

      {cartItems.length === 0 ? (
        <h5>
          -- Your cart is empty 🛒 : <Link to="/"> Go Back</Link>
        </h5>
      ) : (
        <div className="row">
         
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="d-flex align-items-center mb-3 border p-2"
              >
                <img
                  src={getImageURL(item.image)}
                  alt={item.name}
                  width="80"
                  height="80"
                  style={{ objectFit: "contain", borderRadius: "5px" }}
                />

                <div className="ms-3 flex-grow-1">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>

                <div className="me-3">₹{item.price}</div>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => dispatch(removeFromCart(item.product))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

         
          <div className="col-md-4">
            <div className="card p-3">
              <h4>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h4>

              <h5>
                ₹
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.qty, 0)
                  .toFixed(2)}
              </h5>

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
