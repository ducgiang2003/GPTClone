import { combineReducers } from "@reduxjs/toolkit";
import apiLimitSlice from "./slices/countSlice";

const rootReducer = combineReducers({
  apiLimitSlice: apiLimitSlice,
});

export default rootReducer;
