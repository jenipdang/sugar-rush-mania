import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from './components/data/context'


ReactDOM.render(
  <BrowserRouter>
    <DataProvider>
    <App />
    </DataProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
