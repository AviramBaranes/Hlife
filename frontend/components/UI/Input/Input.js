import classes from "./Input.module.scss";

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
    </>
  );
}
export default Input;
