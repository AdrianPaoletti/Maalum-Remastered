import { Backdrop, Fade, Modal as ModalMUI } from "@mui/material";

import styles from "./Modal.module.scss";

interface ModalProps {
  children: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
}

export function Modal({ children, isOpen, handleClose }: ModalProps) {
  return (
    <ModalMUI
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal"
      disableAutoFocus
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <Fade in={isOpen}>
        <div className={styles.modal}>{children}</div>
      </Fade>
    </ModalMUI>
  );
}
