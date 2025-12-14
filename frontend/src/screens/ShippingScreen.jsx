import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <button
        className="btn btn-secondary mb-3 mt-3"
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>
      <CheckoutSteps step1 step2 />
      <h1>Shipping :</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-2 mt-3">
          <label>Address :</label>
          <input
            className="form-control mt-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label>City :</label>
          <input
            className="form-control mt-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label>Postal Code :</label>
          <input
            className="form-control mt-2"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label>Country :</label>
          <input
            className="form-control mt-2"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
