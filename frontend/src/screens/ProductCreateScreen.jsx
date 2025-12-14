

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
  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("countInStock", countInStock);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    await API.post("admin/products/create/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/admin/products");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h3>Create Product</h3>

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
            className="form-control"
            type="number"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Stock</label>
          <input
            className="form-control"
            type="number"
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
          <label>Product Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button className="btn btn-primary w-100">Create Product</button>
      </form>
    </div>
  );
};

export default ProductCreateScreen;
