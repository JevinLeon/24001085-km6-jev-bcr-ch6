import axios from "axios";
import { toast } from "sonner";
import { setIsLoading, setToken, setUser } from "../reducers/auth";

export const login = (navigate, email, password) => async (dispatch) => {
  // setIsLoading(true);
  dispatch(setIsLoading(true));

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/auth/login`,
      { email, password }
    );

    const {
      data: { token, user },
    } = res.data;
    console.log(token, user);

    dispatch(setToken(token));
    dispatch(setUser(user));

    return navigate("/");
  } catch (error) {
    toast.error(error?.response.data.message);

    dispatch(logout());
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const register =
  (navigate, name, email, photo, password) => async (dispatch) => {
    dispatch(setIsLoading(true));

    let data = new FormData();
    data.append("email", email);
    data.append("name", name);
    data.append("photo", photo);
    data.append("password", password);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/register`,
        data
      );

      const {
        data: { token, user },
      } = res.data;

      dispatch(setToken(token));
      dispatch(setUser(user));
      return navigate("/");
    } catch (error) {
      toast(error?.response.data.message);
      dispatch(logout());
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const getProfile =
  (navigate, successRedirect, errorRedirect) => async (dispatch, getState) => {
    const { token } = getState().auth;

    if (!token) {
      if (navigate) {
        if (errorRedirect) {
          navigate(errorRedirect);
        }
      }
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/profile`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { data } = res.data;

      dispatch(setUser(data));

      if (navigate) {
        if (successRedirect) {
          navigate(successRedirect);
        }
      }
    } catch (error) {
      toast(error?.response.data.message);
      dispatch(logout());

      if (navigate) {
        if (errorRedirect) {
          navigate(errorRedirect);
        }
      }
    }
  };

export const logout = (navigate) => async (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  return navigate("/login");
};
