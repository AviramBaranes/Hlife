import classes from "../../../styles/components/Backdrop.module.scss";

type BackdropProps = { onClose: Function; background?: string };

const Backdrop = (props: BackdropProps) => {
  return <div className={classes.backdrop} onClick={() => props.onClose()} />;
};

export default Backdrop;
