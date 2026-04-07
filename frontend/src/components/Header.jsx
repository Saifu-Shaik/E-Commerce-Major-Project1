import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.userLogin || {});
  const { cartItems } = useSelector((state) => state.cart || { cartItems: [] });

  const logoutHandler = () => dispatch(logout());

  const displayName = userInfo?.profile?.first_name?.trim()
    ? userInfo.profile.first_name
    : userInfo?.username;

  // 🔥 Cart Count
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="main-navbar">
      <div className="container d-flex justify-content-between align-items-center">
        {/* LOGO */}
        <Link className="brand-logo" to="/">
          E-Mart
        </Link>

        {/* NAVBAR */}
        <nav>
          <ul className="nav-menu">
            {/* HOME */}
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home 🏠︎
              </Link>
            </li>

            {/* 🛒 CART WITH SMALL BADGE */}
            <li style={{ position: "relative" }}>
              <Link
                to="/cart"
                className={location.pathname === "/cart" ? "active" : ""}
              >
                Cart <i className="fa-solid fa-cart-shopping ms-1"></i>
              </Link>

              {/* 🔥 SMALL PREMIUM BADGE */}
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-10px", // 🔥 moved higher
                    right: "-6px", // 🔥 slightly inside
                    background: "#ff3b3b",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "2px 6px", // 🔥 smaller
                    fontSize: "10px", // 🔥 reduced size
                    fontWeight: "600",
                    lineHeight: "1",
                    minWidth: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </li>

            {userInfo ? (
              <>
                {/* ORDERS */}
                <li>
                  <Link
                    to="/orders"
                    className={location.pathname === "/orders" ? "active" : ""}
                  >
                    My Orders 🚚
                  </Link>
                </li>

                {/* PROFILE */}
                <li>
                  <Link
                    to="/profile"
                    className={location.pathname === "/profile" ? "active" : ""}
                  >
                    Hi, {displayName}
                    <i className="bi bi-person-circle ms-2"></i>
                  </Link>
                </li>

                {/* ADMIN */}
                {userInfo.isAdmin && (
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className={
                        location.pathname.includes("/admin") ? "active" : ""
                      }
                    >
                      Admin Dashboard
                      <i className="fa-solid fa-user-shield ms-2"></i>
                    </Link>
                  </li>
                )}

                {/* LOGOUT */}
                <li>
                  <button className="logout-btn" onClick={logoutHandler}>
                    Logout
                    <i
                      className="bi bi-box-arrow-right ms-2"
                      style={{ color: "white" }}
                    ></i>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className={location.pathname === "/login" ? "active" : ""}
                >
                  Login / SignUp
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
