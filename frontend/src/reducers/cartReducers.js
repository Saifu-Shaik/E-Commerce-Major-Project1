import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    /* ===============================
       ADD ITEM
    =============================== */
    case CART_ADD_ITEM: {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x,
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    }

    /* ===============================
       REMOVE ITEM
    =============================== */
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    /* ===============================
       SAVE SHIPPING
    =============================== */
    case CART_SAVE_SHIPPING:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    /* ===============================
       SAVE PAYMENT
    =============================== */
    case CART_SAVE_PAYMENT:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    /* ===============================
       CLEAR CART (🔥 IMPORTANT FIX)
    =============================== */
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    /* =============================== */
    default:
      return state;
  }
};
