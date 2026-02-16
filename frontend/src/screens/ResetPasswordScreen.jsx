import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ResetPasswordScreen = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await API.post("users/reset-password-confirm/", {
        uid,
        token,
        password,
      });

      setMessage("Password reset successful");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Reset Password</h2>

      {message && <Message variant="success">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <form onSubmit={submitHandler}>
        <input
          type="password"
          className="form-control mt-3"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mt-3"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="btn btn-success mt-3 w-100">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;
