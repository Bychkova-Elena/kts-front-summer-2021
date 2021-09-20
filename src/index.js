import React from "react";

import App from "@App/App";
import ReactDOM from "react-dom";
import "./index.css";
import "@config/configureMobX";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
