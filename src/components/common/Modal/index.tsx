import { ReactNode } from 'react';
import styles from './Modal.module.scss';

interface ModalType {
  open: boolean;
  handleClose?: () => void;
  title?: string;
  children?: ReactNode;
}

const Modal = ({ open, handleClose, title, children }: ModalType) => {
  return open
    ? <div className={styles.Modal} data-testid="modal">
      <div className={styles.Modal__content}>
        <div className={styles.Modal__header}>
          <h3 data-testid="modal-title">{title}</h3>
          <span
            className={styles.Modal__close}
            onClick={handleClose}
            data-testid="modal-close"
          >
            &times;
          </span>
        </div>
        <div data-testid="modal-content">
          {children}
        </div>
      </div>
    </div>
    : null;
}

export default Modal;