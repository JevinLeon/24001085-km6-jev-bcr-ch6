import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [],
  car: null,
  isLoading: false,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    setCar: (state, action) => {
      state.car = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCars, setCar, setIsLoading } = carSlice.actions;

export default carSlice.reducer;
