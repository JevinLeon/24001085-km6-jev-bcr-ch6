import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manufs: [],
  manu: null,
  isLoading: false,
};

const manufSlice = createSlice({
  name: "manufacture",
  initialState,
  reducers: {
    setManufs: (state, action) => {
      state.manufs = action.payload;
    },
    setManuf: (state, action) => {
      state.manu = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setManufs, setManuf, setIsLoading } = manufSlice.actions;

export default manufSlice.reducer;
