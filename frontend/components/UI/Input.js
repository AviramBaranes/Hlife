function Input(props) {
  return (
    <>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input
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
