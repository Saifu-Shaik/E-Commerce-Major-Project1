
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboardScreen = () => {
  return (
    <div className="container mt-4">
      
      <button
        className="btn btn-secondary mb-3"
        onClick={() => window.history.back()}
      >
        ⬅ Back
      </button>

      <h1>
        Admin Dashboard <i className="fa-solid fa-user-shield ms-2"></i>
      </h1>

      <div className="row mt-4">
      
        <div className="col-md-4 mt-3">
          <div className="card p-3 shadow-sm">
            <h4>
              <i className="fa-solid fa-users-gear me-2"></i>
              Users
            </h4>
            <p>View, Edit & Delete Users</p>
            <Link className="btn btn-primary" to="/admin/users">
              Manage Users
            </Link>
          </div>
        </div>

      
        <div className="col-md-4 mt-3">
          <div className="card p-3 shadow-sm">
            <h4>
              <i className="fa-solid fa-box-open me-2"></i>
              Products
            </h4>
            <p>Add, Edit & Delete Products</p>
            <Link className="btn btn-success" to="/admin/products">
              Manage Products
            </Link>
          </div>
        </div>

        
        <div className="col-md-4 mt-3">
          <div className="card p-3 shadow-sm">
            <h4>
              <i className="fa-solid fa-truck-fast me-2"></i>
              Orders
            </h4>
            <p>Track & Update Orders</p>
            <Link className="btn btn-warning" to="/admin/orders">
              Manage Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardScreen;
