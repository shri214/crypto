import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./style.css";
import store from "./Component/Dashboard/redux/store";
import { stores } from "./Component/reduxTK/stores";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
