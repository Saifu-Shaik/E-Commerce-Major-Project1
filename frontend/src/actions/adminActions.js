import API from "../api";

export const getAdminUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_USERS_REQUEST" });

    const { data } = await API.get("admin/users/");
    dispatch({ type: "ADMIN_USERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ADMIN_USERS_FAIL",
      payload: error.response?.data?.detail || "Failed to load users",
    });
  }
};

export const deleteAdminUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_USER_DELETE_REQUEST" });

    await API.delete(`admin/users/delete/${id}/`);

    dispatch({ type: "ADMIN_USER_DELETE_SUCCESS" });

    dispatch(getAdminUsers());
  } catch (error) {
    dispatch({
      type: "ADMIN_USER_DELETE_FAIL",
      payload: error.response?.data?.detail || "Failed to delete user",
    });
  }
};

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_PRODUCTS_REQUEST" });

    const { data } = await API.get("admin/products/");
    dispatch({ type: "ADMIN_PRODUCTS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ADMIN_PRODUCTS_FAIL",
      payload: error.response?.data?.detail || "Failed to load products",
    });
  }
};

export const deleteAdminProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_PRODUCT_DELETE_REQUEST" });

    await API.delete(`admin/products/delete/${id}/`);

    dispatch({ type: "ADMIN_PRODUCT_DELETE_SUCCESS" });

    dispatch(getAdminProducts());
  } catch (error) {
    dispatch({
      type: "ADMIN_PRODUCT_DELETE_FAIL",
      payload: error.response?.data?.detail || "Failed to delete product",
    });
  }
};

export const getAdminOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_ORDERS_REQUEST" });

    const { data } = await API.get("admin/orders/");
    dispatch({ type: "ADMIN_ORDERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ADMIN_ORDERS_FAIL",
      payload: error.response?.data?.detail || "Failed to load orders",
    });
  }
};

export const updateAdminOrder = (id, updateData) => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_ORDER_UPDATE_REQUEST" });

    const { data } = await API.put(`admin/orders/update/${id}/`, updateData);

    dispatch({ type: "ADMIN_ORDER_UPDATE_SUCCESS", payload: data });
    dispatch(getAdminOrders());
  } catch (error) {
    dispatch({
      type: "ADMIN_ORDER_UPDATE_FAIL",
      payload: error.response?.data?.detail || "Failed to update order",
    });
  }
};
