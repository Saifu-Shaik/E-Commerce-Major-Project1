import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './productReducers';
import { cartReducer } from './cartReducers';
import { userLoginReducer, userRegisterReducer } from './userReducers';
import { orderCreateReducer, orderDetailsReducer, myOrdersReducer } from './orderReducers';

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  myOrders: myOrdersReducer,
});
