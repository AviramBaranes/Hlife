import React from "react";
import classes from "./Card.module.scss";

function Card(props: { children: React.ReactNode }) {
  return <div className={classes.Card}>{props.children}</div>;
}

export default Card;
