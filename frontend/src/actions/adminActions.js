import API from "../api";

/* ======================================================
   HELPER: AUTH HEADER (SAFE)
====================================================== */
const getAuthConfig = (getState) => {
  const state = getState();
  const token =
    state?.userLogin?.userInfo?.access || localStorage.getItem("accessToken");

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

/* ======================================================
   ADMIN USERS
====================================================== */

export const getAdminUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ADMIN_USERS_REQUEST" });

    const { data } = await API.get("admin/users/", getAuthConfig(getState));

    dispatch({ type: "ADMIN_USERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ADMIN_USERS_FAIL",
      payload:
        error.response?.data?.detail || error.response?.data || error.message,
    });
  }
};

export const deleteAdminUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ADMIN_USER_DELETE_REQUEST" });

    await API.delete(`admin/users/delete/${id}/`, getAuthConfig(getState));

    dispatch({ type: "ADMIN_USER_DELETE_SUCCESS" });
    dispatch(getAdminUsers());
  } catch (error) {
    dispatch({
      type: "ADMIN_USER_DELETE_FAIL",
      payload:
        error.response?.data?.detail || error.response?.data || error.message,
    });
  }
};

/* ======================================================
   ADMIN PRODUCTS
====================================================== */

export const getAdminProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ADMIN_PRODUCTS_REQUEST" });

    const { data } = await API.get("admin/products/", getAuthConfig(getState));

    dispatch({ type: "ADMIN_PRODUCTS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ADMIN_PRODUCTS_FAIL",
      payload:
        error.response?.data?.detail || error.response?.data || error.message,
    });
  }
};

export const deleteAdminProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ADMIN_PRODUCT_DELETE_REQUEST" });

    await API.delete(`admin/products/delete/${id}/`, getAuthConfig(getState));

    dispatch({ type: "ADMIN_PRODUCT_DELETE_SUCCESS" });
    dispatch(getAdminProducts());
  } catch (error) {
    dispatch({
      type: "ADMIN_PRODUCT_DELETE_FAIL",
      payload:
        error.response?.data?.detail || error.response?.data || error.message,
    });
  }
};

/* ======================================================
   ADMIN ORDERS
====================================================== */

export const getAdminOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ADMIN_ORDERS_REQUEST" });

    // ✅ Correct endpoint (this was causing 404 before)
    const { data } = await API.get("admin/orders/", getAuthConfig(getState));

    dispatch({ type: "ADMIN_ORDERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ADMIN_ORDERS_FAIL",
      payload:
        error.response?.data?.detail || error.response?.data || error.message,
    });
  }
};

export const updateAdminOrder =
  (id, updateData) => async (dispatch, getState) => {
    try {
      dispatch({ type: "ADMIN_ORDER_UPDATE_REQUEST" });

      // ✅ Correct update endpoint
      const { data } = await API.put(
        `admin/orders/update/${id}/`,
        updateData,
        getAuthConfig(getState),
      );

      dispatch({ type: "ADMIN_ORDER_UPDATE_SUCCESS", payload: data });

      // refresh list
      dispatch(getAdminOrders());
    } catch (error) {
      dispatch({
        type: "ADMIN_ORDER_UPDATE_FAIL",
        payload:
          error.response?.data?.detail || error.response?.data || error.message,
      });
    }
  };
