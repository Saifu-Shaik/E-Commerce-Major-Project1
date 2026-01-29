import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../constants/cartConstants";


export const addToCart = (product, qty) => (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    },
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cart.cartItems)
  );
};


export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cart.cartItems)
  );
};


export const saveShipping = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};


export const savePayment = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT,
    payload: data,
  });

  localStorage.setItem("paymentMethod", data);
};
