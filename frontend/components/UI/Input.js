import classes from "./Input.module.css";

function Input(props) {
  return (
    <>
      <label className={classes.Label} htmlFor={props.htmlFor}>
        {props.label}
      </label>
      <input
        className={classes.Input}
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
