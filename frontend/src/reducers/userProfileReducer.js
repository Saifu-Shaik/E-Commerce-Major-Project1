

import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_RESET,
} from "../constants/userConstants";


export const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true, ...state };

    case USER_PROFILE_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { loading: true };

    case USER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };

    case USER_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case USER_PROFILE_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
