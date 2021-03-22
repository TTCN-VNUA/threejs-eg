import React from "react";
import ReactDOM from "react-dom";

import Earth from "./components/Earth/Earth";
import Texts from "./components/Text/index";
import Text2000 from "./components/2000/Text2000";


const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Text2000 />
    <Earth />
    <Texts />
  </React.StrictMode>,
  rootElement
);
