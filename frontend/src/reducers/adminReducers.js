
export const adminUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "ADMIN_USERS_REQUEST":
      return { loading: true, users: [] };

    case "ADMIN_USERS_SUCCESS":
      return { loading: false, users: action.payload };

    case "ADMIN_USERS_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


export const adminUserDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADMIN_USER_DELETE_REQUEST":
      return { loading: true };

    case "ADMIN_USER_DELETE_SUCCESS":
      return { loading: false, success: true };

    case "ADMIN_USER_DELETE_FAIL":
      return { loading: false, error: action.payload };

    case "ADMIN_USER_DELETE_RESET":
      return {};

    default:
      return state;
  }
};


export const adminProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "ADMIN_PRODUCTS_REQUEST":
      return { loading: true, products: [] };

    case "ADMIN_PRODUCTS_SUCCESS":
      return { loading: false, products: action.payload };

    case "ADMIN_PRODUCTS_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


export const adminProductDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADMIN_PRODUCT_DELETE_REQUEST":
      return { loading: true };

    case "ADMIN_PRODUCT_DELETE_SUCCESS":
      return { loading: false, success: true };

    case "ADMIN_PRODUCT_DELETE_FAIL":
      return { loading: false, error: action.payload };

    case "ADMIN_PRODUCT_DELETE_RESET":
      return {};

    default:
      return state;
  }
};



export const adminOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ADMIN_ORDERS_REQUEST":
      return { loading: true, orders: [] };

    case "ADMIN_ORDERS_SUCCESS":
      return { loading: false, orders: action.payload };

    case "ADMIN_ORDERS_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


export const adminOrderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADMIN_ORDER_UPDATE_REQUEST":
      return { loading: true };

    case "ADMIN_ORDER_UPDATE_SUCCESS":
      return { loading: false, success: true, order: action.payload };

    case "ADMIN_ORDER_UPDATE_FAIL":
      return { loading: false, error: action.payload };

    case "ADMIN_ORDER_UPDATE_RESET":
      return {};

    default:
      return state;
  }
};
