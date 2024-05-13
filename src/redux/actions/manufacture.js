import axios from "axios";
import { toast } from "sonner";
import { setManufs, setManuf, setIsLoading } from "../reducers/manufacture";

export const getManufs = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/manufactures`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setManufs(data));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getManuf = (navigate, id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/manufactures/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setManuf(data));
  } catch (error) {
    toast(error?.response.data.message);
    return navigate("/manufacturers");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const addManuf = (setOpen, data) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/manufactures`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const manufRes = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/manufactures`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const { data: manufData } = manufRes.data;
    const { message } = res.data;
    toast(message);
    dispatch(setManufs(manufData));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
    setOpen(false);
  }
};

export const editManuf = (setOpen, data, id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_API}/api/manufactures/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const manufRes = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/manufactures/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data: manufData } = manufRes.data;
    const { message } = res.data;
    toast(message);
    dispatch(setManuf(manufData));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
    setOpen(false);
  }
};

export const deleteManuf =
  (navigate, setOpen, id) => async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setIsLoading(true));

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/api/manufactures/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { message } = res.data;
      toast(message);
    } catch (error) {
      toast(error?.response.data.message);
    } finally {
      dispatch(setIsLoading(false));
      setOpen(false);
      navigate("/manufacturers");
    }
  };
