

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts, deleteAdminProduct } from "../actions/adminActions";

import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AdminProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminProducts = useSelector((state) => state.adminProducts);
  const { loading, products, error } = adminProducts;

  const adminProductDelete = useSelector((state) => state.adminProductDelete);


  const deleteSuccess = adminProductDelete?.success || false;
  const deleteError = adminProductDelete?.error || null;

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch, deleteSuccess]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteAdminProduct(id));
    }
  };

  const createHandler = () => {
    navigate("/admin/product/create");
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h2>Admin Product List</h2>

      <button className="btn btn-primary mb-3 mt-2" onClick={createHandler}>
        + Create Product
      </button>

      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      {!loading && !error && (
        <table className="table table-bordered table-striped mt-2">
          <thead>
            <tr className="table-light">
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Stock</th>
              <th style={{ width: "180px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No products found.
                </td>
              </tr>
            )}

            {products?.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.brand || "-"}</td>
                <td>{p.countInStock}</td>

                <td>
                  <Link
                    to={`/admin/product/${p.id}/edit`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>

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
