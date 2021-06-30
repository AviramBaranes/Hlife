import classes from "./Input.module.css";

function Input(props) {
  const inputClasses = [classes.Input];
  if (props.touched && props.inValid) {
    inputClasses.push(classes.InValid);
  }
  return (
    <>
      <label className={classes.Label} htmlFor={props.htmlFor}>
        {props.label}
      </label>
      <input
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
    </>
  );
}
export default Input;
