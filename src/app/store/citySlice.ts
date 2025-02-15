import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CityState {
  cityName: string;
}

const initialState: CityState = {
  cityName: "",
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    clearCity: (state) => {
      state.cityName = "";
    },
  },
});

export const { setCity, clearCity } = citySlice.actions;
export default citySlice.reducer;
