import API from "../api";

/* =========================================================
   LOGIN
========================================================= */
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const { data } = await API.post("users/login/", {
      username,
      password,
    });

    // backend sends is_admin
    const userData = {
      ...data,
      isAdmin: data.is_admin === true,
    };

    localStorage.setItem("userInfo", JSON.stringify(userData));
    localStorage.setItem("accessToken", data.access);

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: userData });
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: error.response?.data?.detail || "Invalid username or password",
    });
  }
};

/* =========================================================
   LOGOUT
========================================================= */
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accessToken");

  dispatch({ type: "USER_LOGOUT" });

  window.location.href = "/login";
};

/* =========================================================
   REGISTER (ONLY NORMAL USER)
========================================================= */
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });

    const { data } = await API.post("users/register/", {
      username,
      email,
      password,
    });

    // Always normal user
    const userData = {
      ...data,
      isAdmin: false,
    };

    localStorage.setItem("userInfo", JSON.stringify(userData));
    localStorage.setItem("accessToken", data.access);

    dispatch({ type: "USER_REGISTER_SUCCESS", payload: userData });
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: userData });
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload:
        error.response?.data?.detail ||
        error.response?.data ||
        "Registration failed",
    });
  }
};

/* =========================================================
   GET PROFILE
========================================================= */
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "USER_PROFILE_REQUEST" });

    const { data } = await API.get("users/profile/");

    dispatch({
      type: "USER_PROFILE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_PROFILE_FAIL",
      payload: error.response?.data?.detail || "Failed to fetch profile",
    });
  }
};

/* =========================================================
   UPDATE PROFILE (NON ADMIN ONLY)
========================================================= */
export const updateUserProfile = (formData) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { userInfo } = userLogin;

    // Block admin update
    if (userInfo?.isAdmin) {
      return dispatch({
        type: "USER_PROFILE_UPDATE_FAIL",
        payload: "Admin cannot update profile",
      });
    }

    dispatch({ type: "USER_PROFILE_UPDATE_REQUEST" });

    const { data } = await API.put("users/profile/update/", formData);

    // keep old token
    const updatedUser = {
      ...data,
      access: userInfo.access,
      isAdmin: false,
    };

    localStorage.setItem("userInfo", JSON.stringify(updatedUser));

    dispatch({ type: "USER_PROFILE_UPDATE_SUCCESS", payload: updatedUser });
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: updatedUser });
  } catch (error) {
    dispatch({
      type: "USER_PROFILE_UPDATE_FAIL",
      payload: error.response?.data?.detail || "Profile update failed",
    });
  }
};
