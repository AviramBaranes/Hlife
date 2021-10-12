import { ReactNode } from "react";
import ReactDom from "react-dom";

import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.scss";

type BackdropProps = { onClose: Function };
type ModalOverlayProps = { children: ReactNode };
type ModalProps = BackdropProps & ModalOverlayProps;

const ModalOverlay = (props: ModalOverlayProps) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props: ModalProps) => {
  return ReactDom.createPortal(
    <>
      <Backdrop onClose={props.onClose} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </>,
    document.getElementById("overlays") as HTMLDivElement
  );
};

export default Modal;
