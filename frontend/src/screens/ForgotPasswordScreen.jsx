import React, { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");

  const generateLinkHandler = async () => {
    try {
      const { data } = await API.post("password/generate-link/", { email });

      setResetLink(data.reset_link);
      toast.success("Reset link generated!");
    } catch (error) {
      toast.error("User not found");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>

      <input
        type="email"
        className="form-control mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      {resetLink && (
        <div className="alert alert-success">
          <p>Reset Link:</p>
          <a href={resetLink}>{resetLink}</a>
        </div>
      )}

      <button className="btn btn-primary" onClick={generateLinkHandler}>
        Generate Reset Link
      </button>
    </div>
  );
};

export default ForgotPasswordScreen;
