import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import car from "./car";

// it will combining some reducers that will be possible to call in the jsx files
export default combineReducers({
  auth,
  car,
});
