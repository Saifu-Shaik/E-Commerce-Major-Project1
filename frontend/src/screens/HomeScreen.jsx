import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>Latest Products :</h2>
      <br />

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <div className="row">
        {products && products.length > 0
          ? products.map((product) => (
              <div className="col-md-4 col-sm-6" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          : !loading && <Message>No products found</Message>}
      </div>
    </div>
  );
};

export default HomeScreen;
