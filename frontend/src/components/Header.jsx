
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.userLogin || {});

  const logoutHandler = () => dispatch(logout());

  const displayName = userInfo?.profile?.first_name?.trim()
    ? userInfo.profile.first_name
    : userInfo?.username;

  return (
    <header className="main-navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="brand-logo" to="/">
          E-Mart
        </Link>

        
        <nav>
          <ul className="nav-menu">
            
            <li>
              <Link
                to="/cart"
                className={location.pathname === "/cart" ? "active" : ""}
              >
                Cart <i className="fa-solid fa-cart-shopping ms-1"></i>
              </Link>
            </li>

            {userInfo ? (
              <>
                
                <li>
                  <Link
                    to="/profile"
                    className={location.pathname === "/profile" ? "active" : ""}
                  >
                    Hi, {displayName}
                    <i className="bi bi-person-circle ms-2"></i>
                  </Link>
                </li>

                
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
