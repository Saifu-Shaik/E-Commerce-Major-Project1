import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  // 🔹 Redux state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [] } = productList;

  // 🔍 Search state
  const [search, setSearch] = useState("");

  // 🔥 Animated placeholder
  const suggestions = ["Electronics", "Fashion", "Mobiles", "Laptops", "Shoes"];
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // ✨ Typing animation
  useEffect(() => {
    const currentWord = suggestions[index];

    if (charIndex < currentWord.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + currentWord[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setIndex((prev) => (prev + 1) % suggestions.length);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [charIndex, index]);

  // 🔍 Filter products
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container mt-2">
      {/* 🔍 CENTERED SEARCH BAR */}
      <div className="search-container">
        <div className="search-wrapper">
          <input
            type="text"
            className="google-search"
            placeholder={`Heyy👋! Search for 🔍 ${displayText} ...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* ❌ CLEAR BUTTON (INSIDE INPUT) */}
          {search && (
            <span className="clear-btn" onClick={() => setSearch("")}>
              ✖
            </span>
          )}
        </div>
      </div>

      {/* 🧾 TITLE */}
      <h2 className="mb-4 fade-in">Latest Products :</h2>

      {/* ⏳ LOADING */}
      {loading && <Loader />}

      {/* ❌ ERROR */}
      {error && <Message variant="danger">{error}</Message>}

      {/* 🛒 PRODUCTS */}
      {!loading && !error && (
        <div className="row">
          {filteredProducts.length === 0 ? (
            <Message>No products found</Message>
          ) : (
            filteredProducts.map((product, i) => (
              <div
                key={product.id}
                className="col-md-4 col-sm-6 mb-4 fade-in-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
