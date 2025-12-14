
import API from "../api";


export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const { data } = await API.post("users/login/", { username, password });

    
    data.isAdmin = data.is_admin === true;

    
    localStorage.setItem("userInfo", JSON.stringify(data));
    localStorage.setItem("accessToken", data.access);

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });

  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response?.data?.detail ||
        error.response?.data ||
        "Login failed. Try again.",
    });
  }
};


export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: "USER_LOGOUT" });
  window.location.href = "/login";
};


export const register = (username, email, password, isAdmin) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });

    const { data } = await API.post("users/register/", {
      username,
      email,
      password,
      is_admin: isAdmin,
    });

    data.isAdmin = data.is_admin === true;

    
    localStorage.setItem("userInfo", JSON.stringify(data));
    localStorage.setItem("accessToken", data.access);

    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });

  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload:
        error.response?.data?.detail ||
        error.response?.data ||
        "Registration failed.",
    });
  }
};

/* =============================================================
   GET PROFILE
============================================================= */
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "USER_PROFILE_REQUEST" });

    const { data } = await API.get("users/profile/");

    dispatch({ type: "USER_PROFILE_SUCCESS", payload: data });

  } catch (error) {
    dispatch({
      type: "USER_PROFILE_FAIL",
      payload:
        error.response?.data?.detail ||
        error.response?.data ||
        "Unable to fetch profile.",
    });
  }
};

/* =============================================================
   UPDATE PROFILE (ONLY NORMAL USERS)
============================================================= */
export const updateUserProfile = (formData) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { userInfo } = userLogin;

    // ADMIN CANNOT UPDATE PROFILE
    if (userInfo?.isAdmin) {
      return dispatch({
        type: "USER_PROFILE_UPDATE_FAIL",
        payload: "Admin users cannot update profile.",
      });
    }

    dispatch({ type: "USER_PROFILE_UPDATE_REQUEST" });

    const { data } = await API.put("users/profile/update/", formData);

    dispatch({ type: "USER_PROFILE_UPDATE_SUCCESS", payload: data });

    // Update localStorage after profile change
    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });

  } catch (error) {
    dispatch({
      type: "USER_PROFILE_UPDATE_FAIL",
      payload:
        error.response?.data?.detail ||
        error.response?.data ||
        "Failed to update profile.",
    });
  }
};
