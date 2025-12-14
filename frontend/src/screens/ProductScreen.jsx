import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { getImageURL } from "../utils/imageHelper";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails,
  );

  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (id) dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    if (!product) return;
    dispatch(addToCart(product, qty));
    navigate("/cart");
  };

  return (
    <div className="container mt-3">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {typeof error === "object" ? JSON.stringify(error) : error}
        </Message>
      ) : product ? (
        <div className="row">
          
          <div className="col-md-6">
            <img
              src={getImageURL(product.image)}
              alt={product.name}
              className="img-fluid border rounded"
              style={{ objectFit: "contain", maxHeight: "420px" }}
            />
          </div>

          
          <div className="col-md-6">
            <h3 className="fw-bold">{product.name}</h3>
            <p className="fw-bold mt-3">Brand : {product.brand}</p>
            <p className="text-muted">{product.description}</p>

            <h4 className="text-success fw-bold">₹{product.price}</h4>
            <p>
              <strong>Stock:</strong>{" "}
              {product.countInStock > 0 ? (
                <span className="text-success">Available</span>
              ) : (
                <span className="text-danger">Out Of Stock</span>
              )}
            </p>

            
            {product.countInStock > 0 && (
              <>
                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <select
                    className="form-select"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button className="btn btn-success" onClick={addToCartHandler}>
                  Add To Cart 🛒
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <Message variant="warning">Product not found.</Message>
      )}
    </div>
  );
};

export default ProductScreen;
