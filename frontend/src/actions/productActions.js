import API from "../api";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from "../constants/productConstants";

const BASE_URL = "https://e-commerce-major-project1-backend.onrender.com";

/* =========================================================
   IMAGE FIXER
========================================================= */
const fixImageURL = (img) => {
  if (!img) return "";
  if (img.startsWith("http")) return img;
  return `${BASE_URL}${img.startsWith("/") ? img : "/" + img}`;
};

/* =========================================================
   PUBLIC PRODUCT LIST
========================================================= */
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await API.get("products/");

    const products = data.map((p) => ({
      ...p,
      image: fixImageURL(p.image),
    }));

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response?.data || error.message,
    });
  }
};

/* =========================================================
   ADMIN PRODUCT LIST  ⭐⭐⭐ IMPORTANT FIX
========================================================= */
export const listAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await API.get("admin/products/");

    const products = data.map((p) => ({
      ...p,
      image: fixImageURL(p.image),
    }));

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

/* =========================================================
   PRODUCT DETAILS
========================================================= */
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await API.get(`products/${id}/`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: { ...data, image: fixImageURL(data.image) },
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data || error.message,
    });
  }
};

/* =========================================================
   DELETE PRODUCT
========================================================= */
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    await API.delete(`admin/products/delete/${id}/`);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

/* =========================================================
   CREATE PRODUCT
========================================================= */
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const { data } = await API.post("admin/products/create/", productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

/* =========================================================
   UPDATE PRODUCT
========================================================= */
export const updateProduct = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const { data } = await API.put(
      `admin/products/update/${id}/`,
      updatedData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};
