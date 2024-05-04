import axios from "axios";
import { toast } from "sonner";
import { setCars, setCar, setIsLoading } from "../reducers/car";

export const getCars = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/cars`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setCars(data));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getCar = (navigate, id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/cars/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = res.data;

    dispatch(setCar(data));
  } catch (error) {
    toast(error?.response.data.message);
    return navigate("/cars");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const addCar = (setOpen, data) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/cars`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const carRes = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/cars`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const { data: carsData } = carRes.data;
    const { message } = res.data;
    toast(message);
    dispatch(setCars(carsData));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
    setOpen(false);
  }
};

export const editCar = (setOpen, data, id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setIsLoading(true));

  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_API}/api/cars/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const carRes = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/cars/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data: carData } = carRes.data;
    const { message } = res.data;
    toast(message);
    dispatch(setCar(carData));
  } catch (error) {
    toast(error?.response.data.message);
  } finally {
    dispatch(setIsLoading(false));
    setOpen(false);
  }
};

export const deleteCar =
  (navigate, setOpen, id) => async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setIsLoading(true));

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/api/cars/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { message } = res.data;
      toast(message);
    } catch (error) {
      toast(error?.response.data.message);
    } finally {
      dispatch(setIsLoading(false));
      setOpen(false);
      navigate("/cars");
    }
  };
