import React, { useState } from "react";
import API from "../api";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await API.post("users/forgot-password/", { email });

      setMessage("Password reset link sent to your email");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Forgot Password</h2>

      {message && <Message variant="success">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <form onSubmit={submitHandler}>
        <input
          type="email"
          className="form-control mt-3"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="btn btn-primary mt-3 w-100">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
