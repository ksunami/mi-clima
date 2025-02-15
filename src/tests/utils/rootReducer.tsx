import { combineReducers } from "@reduxjs/toolkit";

const cityReducer = (state = { cityName: "" }, action: any) => {
  // Este reducer dummy simplemente devuelve el estado inicial
  return state;
};

const rootReducer = combineReducers({
  city: cityReducer,
});

export default rootReducer;
