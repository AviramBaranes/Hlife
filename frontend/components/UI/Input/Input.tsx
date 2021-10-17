import { ChangeEventHandler, LegacyRef, useRef } from "react";
import classes from "./Input.module.scss";

export interface InputProps {
  touched: boolean;
  inValid: boolean;
  label: string;
  htmlFor: string;
  type: string;
  value: string | number;
  inputChangeHandler: ChangeEventHandler<HTMLInputElement>;
  elementConfig?: {};
  setErrorMsg?: React.Dispatch<React.SetStateAction<string>>;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const inputRef = useRef() as any;
  const inputClasses = [classes.Input];

  if (props.touched && props.inValid) {
    if (document.activeElement === inputRef.current) {
      inputClasses.push(classes.InValid);
      if (props.setErrorMsg && props.errorMessage) {
        props.setErrorMsg(props.errorMessage);
      }
    }
  }
  return (
    <div className={classes.FormItem}>
      <label className={classes.Label} htmlFor={props.htmlFor}>
        {props.label}:
      </label>
      <input
        ref={inputRef}
        role="textbox"
        id={props.htmlFor}
        className={inputClasses.join(" ")}
        required
        name={props.htmlFor}
        type={props.type}
        value={props.value}
        placeholder={props.htmlFor}
        onChange={props.inputChangeHandler}
        {...props.elementConfig}
      />
      <br />
    </div>
  );
};
export default Input;
