import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import net from "./utils/predictionAPI"

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
