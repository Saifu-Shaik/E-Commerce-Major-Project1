import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <CheckoutSteps step1 step2 step3 />

      <h2>Payment Method: </h2>

      <form onSubmit={submitHandler}>
        <div className="form-check d-flex align-items-center my-3 mt-4">
          <input
            className="form-check-input me-2"
            type="radio"
            checked
            readOnly
          />

          <label className="form-check-label d-flex align-items-center">
            - Cash on Delivery
            <i
              className="bi bi-cash-coin ms-2"
              style={{ fontSize: "30px", color: "green" }}
            ></i>
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;
