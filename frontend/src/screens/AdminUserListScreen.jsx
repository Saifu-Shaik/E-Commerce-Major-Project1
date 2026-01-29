

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUsers, deleteAdminUser } from "../actions/adminActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AdminUserListScreen = () => {
  const dispatch = useDispatch();

  const adminUsers = useSelector((state) => state.adminUsers);
  const { loading, error, users } = adminUsers;

  const adminUserDelete = useSelector((state) => state.adminUserDelete);

  
  const deleteSuccess = adminUserDelete?.success || false;
  const deleteError = adminUserDelete?.error || null;

  useEffect(() => {
    dispatch(getAdminUsers());
  }, [dispatch, deleteSuccess]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteAdminUser(id));
    }
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => window.history.back()}
      >
        ⬅ Back
      </button>

      <h2>
        Admin - User Management <i className="bi bi-people-fill ms-2"></i>
      </h2>

      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      {!loading && !error && (
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
            {users?.map((u) => (
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

            {users?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No Users Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserListScreen;
