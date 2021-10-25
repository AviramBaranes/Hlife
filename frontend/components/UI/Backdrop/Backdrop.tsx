import classes from "../../../styles/components/Backdrop.module.scss";

type BackdropProps = { onClose: Function; background?: string };

const Backdrop = (props: BackdropProps) => {
  return <div style={{background:props.background || ''}} className={classes.backdrop} onClick={() => props.onClose()} />;
};

export default Backdrop;
