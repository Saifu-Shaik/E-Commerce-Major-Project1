import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Product
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

  // Update Product (JSON — NOT multipart)
  const updateHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.put(`admin/products/update/${id}/`, {
        name: product.name,
        brand: product.brand,
        price: product.price,
        countInStock: product.countInStock,
        description: product.description,
        image_url: product.image, // 🔥 send direct image URL
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
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Price</label>
            <input
              className="form-control"
              type="number"
              value={product.price || ""}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
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

          {/* 🔥 Image URL instead of file */}
          <div className="mb-3">
            <label>Product Image URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="Paste image link (https://...)"
              value={product.image || ""}
              onChange={(e) =>
                setProduct({ ...product, image: e.target.value })
              }
            />
            <small className="text-muted">
              Only direct image links are allowed (jpg/png/webp)
            </small>
          </div>

          <button className="btn btn-primary w-100">Update Product</button>
        </form>
      )}
    </div>
  );
};

export default ProductEditScreen;
