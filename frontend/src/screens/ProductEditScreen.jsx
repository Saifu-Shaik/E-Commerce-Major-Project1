import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`products/${id}/`);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

 
  const updateHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("brand", product.brand);
      formData.append("price", product.price);
      formData.append("countInStock", product.countInStock);
      formData.append("description", product.description);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await API.put(`admin/products/update/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/products");
    } catch (err) {
      setError("Product update failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h3>Edit Product</h3>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      {!loading && (
        <form onSubmit={updateHandler}>
          <div className="mb-3">
            <label>Name</label>
            <input
              className="form-control"
              value={product.name || ""}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label>Brand</label>
            <input
              className="form-control"
              value={product.brand || ""}
              onChange={(e) => setProduct({ ...product, brand: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>Price</label>
            <input
              className="form-control"
              type="number"
              value={product.price || ""}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label>Stock Count</label>
            <input
              className="form-control"
              type="number"
              value={product.countInStock || ""}
              onChange={(e) =>
                setProduct({ ...product, countInStock: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={product.description || ""}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Product Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          <button className="btn btn-primary w-100">Update Product</button>
        </form>
      )}
    </div>
  );
};

export default ProductEditScreen;
