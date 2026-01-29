import API from "../api";

export const createOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_CREATE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await API.post("orders/add/", orderData, config);

    dispatch({
      type: "ORDER_CREATE_SUCCESS",
      payload: data,
    });

    
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
