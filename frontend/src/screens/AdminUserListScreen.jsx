import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUsers, deleteAdminUser } from "../actions/adminActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

const AdminUserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logged in user
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Users state
  const adminUsers = useSelector((state) => state.adminUsers);
  const { loading, error, users } = adminUsers;

  // Delete state
  const adminUserDelete = useSelector((state) => state.adminUserDelete);
  const deleteSuccess = adminUserDelete?.success || false;
  const deleteError = adminUserDelete?.error || null;

  /*
  =========================================================
  SECURITY CHECK
  =========================================================
  */
  useEffect(() => {
    // Not logged in
    if (!userInfo) {
      navigate("/login");
      return;
    }

    // Not admin
    if (!userInfo.isAdmin) {
      navigate("/");
      return;
    }

    dispatch(getAdminUsers());
  }, [dispatch, navigate, userInfo, deleteSuccess]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteAdminUser(id));
    }
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/admin/dashboard")}
      >
        ⬅ Back
      </button>

      <h2>
        Admin - User Management <i className="bi bi-people-fill ms-2"></i>
      </h2>

      {/* Delete Error */}
      {deleteError && <Message variant="danger">{deleteError}</Message>}

      {/* API Error */}
      {error && (
        <Message variant="danger">
          {typeof error === "string"
            ? error
            : error?.detail || "Failed to load users"}
        </Message>
      )}

      {/* Loading */}
      {loading && <Loader />}

      {/* Empty */}
      {!loading && !error && users?.length === 0 && (
        <Message>No users found</Message>
      )}

      {/* Table */}
      {!loading && !error && users?.length > 0 && (
        <table className="table table-bordered table-striped mt-3">
          <thead>
            <tr className="table-light">
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Admin?</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.is_staff ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteHandler(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserListScreen;
