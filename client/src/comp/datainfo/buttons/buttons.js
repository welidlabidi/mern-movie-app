import React from "react";
import "./button.scss";
const Buttons = (props) => (
  <button onClick={props.clicked}>{props.input}</button>
);

export default Buttons;
