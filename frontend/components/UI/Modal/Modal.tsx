import { ReactNode } from 'react';
import ReactDom from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';
import classes from '../../../styles/components/Modal.module.scss';

type BackdropProps = { onClose: Function };
type ModalOverlayProps = { yPosition?: string };
type ModalProps = BackdropProps & ModalOverlayProps;

const ModalOverlay: React.FC<ModalOverlayProps> = ({ children, yPosition }) => {
  return (
    <div className={classes.modal} style={{ top: yPosition }}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ children, yPosition, onClose }) => {
  return ReactDom.createPortal(
    <>
      <Backdrop onClose={onClose} />
      <ModalOverlay yPosition={yPosition}>{children}</ModalOverlay>
    </>,
    document.getElementById('overlays') as HTMLDivElement
  );
};

export default Modal;
