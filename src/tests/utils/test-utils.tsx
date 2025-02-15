import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; 

interface ExtendedRenderOptions extends RenderOptions {
  initialState?: any;
  store?: any;
}

export function renderWithRedux(
  ui: React.ReactElement,
  { initialState, store = configureStore({ reducer: rootReducer, preloadedState: initialState }), ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
