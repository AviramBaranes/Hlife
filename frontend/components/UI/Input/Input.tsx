import { ChangeEventHandler } from "react";
import classes from "./Input.module.scss";

interface InputProps {
  touched: boolean;
  inValid: boolean;
  label: string;
  htmlFor: string;
  type: string;
  value: string;
  inputChangeHandler: Function;
  elementConfig?: {};
}

function Input(props: InputProps) {
  const inputClasses = [classes.Input];

  if (props.touched && props.inValid) {
    inputClasses.push(classes.InValid);
  }
  return (
    <div className={classes.FormItem}>
      <label className={classes.Label} htmlFor={props.htmlFor}>
        {props.label}:
      </label>
      <input
        role="textbox"
        id={props.htmlFor}
        className={inputClasses.join(" ")}
        required
        name={props.htmlFor}
        type={props.type}
        value={props.value}
        placeholder={props.htmlFor}
        onChange={
          props.inputChangeHandler as ChangeEventHandler<HTMLInputElement>
        }
        {...props.elementConfig}
      />
      <br />
    </div>
  );
}
export default Input;
