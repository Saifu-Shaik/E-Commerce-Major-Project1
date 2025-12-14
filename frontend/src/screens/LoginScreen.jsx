import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector(
    (state) => state.userLogin || {},
  );

  
  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin || userInfo.is_admin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [userInfo, navigate]);

  
  const submitHandler = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Username and Password are required!");
      return;
    }

    dispatch(login(username, password));
  };

  
  const getErrorText = () => {
    if (!error) return null;
    if (typeof error === "string") return error;
    if (typeof error === "object") return Object.values(error).join(", ");
    return "Something went wrong";
  };

  return (
    <FormContainer>
      <h1 className="mt-3">Hey!! Login Here 😊</h1>

      {loading && <Loader />}

      {error && (
        <div className="alert alert-danger text-center">{getErrorText()}</div>
      )}

      <form onSubmit={submitHandler} className="mt-3">
        
        <div className="mb-3">
          <label>Username :</label>
          <input
            className="form-control mt-2"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        
        <div className="mb-3">
          <label>Password :</label>
          <input
            className="form-control mt-2"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>

      <p className="mt-3 text-center">
        New Customer ? <Link to="/signup">Register Here 🎯</Link>
      </p>
    </FormContainer>
  );
};

export default LoginScreen;
