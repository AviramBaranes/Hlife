import classes from "./Card.module.scss";

function Card(props) {
  return <div className={classes.Card}>{props.children}</div>;
}

export default Card;
