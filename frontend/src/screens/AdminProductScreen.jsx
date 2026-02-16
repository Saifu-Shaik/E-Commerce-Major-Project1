import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts, deleteAdminProduct } from "../actions/adminActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AdminProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= USER ================= */
  const { userInfo } = useSelector((state) => state.userLogin);

  /* ================= PRODUCTS ================= */
  const adminProducts = useSelector((state) => state.adminProducts);
  const { loading, products = [], error } = adminProducts;

  /* ================= DELETE ================= */
  const adminProductDelete = useSelector((state) => state.adminProductDelete);
  const { success: deleteSuccess, error: deleteError } =
    adminProductDelete || {};

  /* ================= AUTH PROTECTION ================= */
  useEffect(() => {
    // Not logged in
    if (!userInfo) {
      navigate("/login");
      return;
    }

    // Logged in but not admin
    if (!userInfo.isAdmin) {
      navigate("/");
      return;
    }

    dispatch(getAdminProducts());
  }, [dispatch, navigate, userInfo, deleteSuccess]);

  /* ================= HANDLERS ================= */
  const deleteHandler = (id) => {
    if (window.confirm("Delete this product?")) {
      dispatch(deleteAdminProduct(id));
    }
  };

  const createHandler = () => {
    navigate("/admin/product/create");
  };

  /* ================= ERROR TEXT FIX ================= */
  const formatError = (err) => {
    if (!err) return null;
    if (typeof err === "string") return err;
    if (err.detail) return err.detail;
    return "Something went wrong";
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/admin/dashboard")}
      >
        ⬅ Back
      </button>

      <h2>Admin Product List</h2>

      <button className="btn btn-primary mb-3 mt-2" onClick={createHandler}>
        + Create Product
      </button>

      {/* DELETE ERROR */}
      {deleteError && (
        <Message variant="danger">{formatError(deleteError)}</Message>
      )}

      {/* FETCH ERROR */}
      {error && <Message variant="danger">{formatError(error)}</Message>}

      {/* LOADING */}
      {loading && <Loader />}

      {/* EMPTY STATE */}
      {!loading && !error && products.length === 0 && (
        <Message>No products found</Message>
      )}

      {/* TABLE */}
      {!loading && !error && products.length > 0 && (
        <table className="table table-bordered table-striped mt-2">
          <thead>
            <tr className="table-light">
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Stock</th>
              <th style={{ width: "200px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.brand || "-"}</td>
                <td>{p.countInStock}</td>

                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => navigate(`/admin/product/${p.id}/edit`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteHandler(p.id)}
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

export default AdminProductListScreen;
