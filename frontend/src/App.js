import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";


import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import AdminUserListScreen from "./screens/AdminUserListScreen";
import AdminOrderListScreen from "./screens/AdminOrderListScreen";
import AdminProductListScreen from "./screens/AdminProductScreen";
import AdminOrderEditScreen from "./screens/AdminOrderEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";


import AdminRoute from "./utils/AdminRoute";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <Header />

        <main className="content-area">
          <Routes>
            
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<RegisterScreen />} />

            
            <Route
              path="/shipping"
              element={
                <PrivateRoute>
                  <ShippingScreen />
                </PrivateRoute>
              }
            />

            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <PaymentScreen />
                </PrivateRoute>
              }
            />

            <Route
              path="/placeorder"
              element={
                <PrivateRoute>
                  <PlaceOrderScreen />
                </PrivateRoute>
              }
            />

            
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />

            

            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboardScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUserListScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrderListScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProductListScreen />
                </AdminRoute>
              }
            />

           
            <Route
              path="/admin/product/create"
              element={
                <AdminRoute>
                  <ProductCreateScreen />
                </AdminRoute>
              }
            />

            
            <Route
              path="/admin/product/:id/edit"
              element={
                <AdminRoute>
                  <ProductEditScreen />
                </AdminRoute>
              }
            />

          
            <Route
              path="/admin/order/:id/edit"
              element={
                <AdminRoute>
                  <AdminOrderEditScreen />
                </AdminRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
