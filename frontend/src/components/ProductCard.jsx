import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card p-3">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "contain",
            backgroundColor: "#f8f8f8",
            borderRadius: "10px",
          }}
        />
      </Link>

      <div className="mt-3 text-center">
        <Link to={`/product/${product.id}`} className="product-title">
          <strong>{product.name}</strong>
        </Link>
        <p className="mt-2">₹ {product.price}.00</p>
      </div>
    </div>
  );
};

export default ProductCard;
