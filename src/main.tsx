import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import defaultTheme from "./theme";
import { fakeStoreApi } from "./redux/fakeStoreApiSlice";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const customTheme = responsiveFontSizes(defaultTheme);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={fakeStoreApi}>
      <Provider store={store}>
        <ThemeProvider theme={customTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
