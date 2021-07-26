import React from "react";

import classes from "./Button.module.scss";

interface ButtonProps {
  disabled: boolean;
  type: "button" | "submit";
  children: React.ReactNode;
  clicked?: Function;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => (
  <button
    disabled={props.disabled}
    className={classes.Button}
    onClick={() => props.clicked}
    type={props.type}
  >
    {props.children}
  </button>
);

export default Button;
