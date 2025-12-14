import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister,
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password, isAdmin));
  };

  const getErrorText = () => {
    if (!error) return null;
    if (typeof error === "string") return error;
    if (typeof error === "object") return Object.values(error).join(", ");
    return "Something went wrong";
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <Link className="btn btn-secondary mb-3" to="/">
        ⬅ Back
      </Link>

      <h2>Create Account</h2>

      {loading && <Loader />}
      {error && <Message variant="danger">{getErrorText()}</Message>}

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label>Username</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Register As</label>
          <select
            className="form-select mt-2"
            value={isAdmin ? "true" : "false"}
            onChange={(e) => setIsAdmin(e.target.value === "true")}
          >
            <option value="false">Normal User</option>
            <option value="true">Admin</option>
          </select>
        </div>

        <button className="btn btn-primary w-100">Register</button>
      </form>

      <div className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterScreen;
