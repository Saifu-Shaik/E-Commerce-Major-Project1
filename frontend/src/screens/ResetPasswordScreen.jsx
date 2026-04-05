import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";

const ResetPasswordScreen = () => {
  const { uid } = useParams();
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post(`password/reset/${uid}/`, { password });

      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error("Invalid or expired link");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Reset Your Password 🔑</h2>

      <form onSubmit={submitHandler}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;
