
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };

    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };

    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };

    case "USER_LOGOUT":
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };

    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };

    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };

    case "USER_LOGOUT":
      return {};

    default:
      return state;
  }
};


export const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_PROFILE_REQUEST":
      return { loading: true, ...state };

    case "USER_PROFILE_SUCCESS":
      return { loading: false, user: action.payload };

    case "USER_PROFILE_FAIL":
      return { loading: false, error: action.payload };

    case "USER_LOGOUT":
      return { user: {} };

    default:
      return state;
  }
};


export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_PROFILE_UPDATE_REQUEST":
      return { loading: true };

    case "USER_PROFILE_UPDATE_SUCCESS":
      return {
        loading: false,
        success: true,
        user: action.payload,
      };

    case "USER_PROFILE_UPDATE_FAIL":
      return { loading: false, error: action.payload };

    case "USER_PROFILE_UPDATE_RESET":
      return {};

    case "USER_LOGOUT":
      return {};

    default:
      return state;
  }
};
