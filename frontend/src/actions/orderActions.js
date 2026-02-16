import API from "../api";

/* =========================================================
   CREATE ORDER
========================================================= */
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: "ORDER_CREATE_REQUEST" });

    const { data } = await API.post("orders/add/", orderData);

    dispatch({
      type: "ORDER_CREATE_SUCCESS",
      payload: data,
    });

    // clear cart after success
    localStorage.removeItem("cartItems");
    dispatch({ type: "CART_CLEAR_ITEMS" });

    return data;
  } catch (error) {
    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload: error.response?.data?.detail || "Order failed",
    });
  }
};

/* =========================================================
   MY ORDERS (USER)
========================================================= */
export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "ORDER_LIST_MY_REQUEST" });

    const { data } = await API.get("orders/my/");

    dispatch({
      type: "ORDER_LIST_MY_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_LIST_MY_FAIL",
      payload: error.response?.data?.detail || error.message,
    });
  }
};

/* =========================================================
   ADMIN - ALL ORDERS
========================================================= */
export const listAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "ORDER_LIST_REQUEST" });

    const { data } = await API.get("admin/orders/");

    dispatch({
      type: "ORDER_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_LIST_FAIL",
      payload: error.response?.data?.detail || error.message,
    });
  }
};

/* =========================================================
   ADMIN - UPDATE ORDER (DELIVER / PAID)
========================================================= */
export const updateOrder = (id, updateData) => async (dispatch) => {
  try {
    dispatch({ type: "ORDER_UPDATE_REQUEST" });

    const { data } = await API.put(`admin/orders/update/${id}/`, updateData);

    dispatch({
      type: "ORDER_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_UPDATE_FAIL",
      payload: error.response?.data?.detail || error.message,
    });
  }
};
