import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const ProductCreateScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // URL
  const [error, setError] = useState("");

  // simple direct-image validator
  const isValidImageUrl = (url) => {
    return /(https?:\/\/.*\.(?:png|jpg|jpeg|webp))/i.test(url);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidImageUrl(image)) {
      setError("Please enter a valid direct image link (jpg, png, webp)");
      return;
    }

    try {
      await API.post("admin/products/create/", {
        name,
        brand,
        price,
        countInStock,
        description,
        image_url: image, // 🔥 correct field for backend
      });

      navigate("/admin/products");
    } catch (err) {
      setError("Product creation failed. Please check inputs.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h3>Create Product</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Brand</label>
          <input
            className="form-control"
            required
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Stock</label>
          <input
            type="number"
            className="form-control"
            required
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Product Image URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="Paste direct image link (https://...)"
            required
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100">Create Product</button>
      </form>

      <div className="alert alert-info mt-4">
        <b>Note:</b> Only direct image links are accepted. Uploading image files
        is disabled because server storage is temporary. Use image URLs from
        Unsplash, Pexels, or CDN product links.
      </div>
    </div>
  );
};

export default ProductCreateScreen;
