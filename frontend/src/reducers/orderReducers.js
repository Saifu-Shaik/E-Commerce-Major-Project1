export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return {
        loading: true,
        success: false,
      };

    case "ORDER_CREATE_SUCCESS":
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case "ORDER_CREATE_FAIL":
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case "ORDER_CREATE_RESET":
      return {};

    default:
      return state;
  }
};

/* =========================================================
   MY ORDERS REDUCER  ✅ ADD THIS
========================================================= */

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ORDER_LIST_MY_REQUEST":
      return {
        loading: true,
        orders: [],
      };

    case "ORDER_LIST_MY_SUCCESS":
      return {
        loading: false,
        orders: action.payload,
      };

    case "ORDER_LIST_MY_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
