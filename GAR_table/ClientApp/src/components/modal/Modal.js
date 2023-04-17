import { useEffect } from "react";
import c from "./Modal.module.css"

export const Modal = ({ isVisible = false, title, content, footer, onClose }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return !isVisible ? null : (
    <div className={c.modal} onClick={onClose}>
      <div className={c["modal-dialog"]} onClick={e => e.stopPropagation()}>
        <div className={c["modal-header"]}>
          <h3 className={c["modal-title"]}>{title}</h3>
          <span className={c["modal-close"]} onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </span>
        </div>
        <div className={c["modal-body"]}>
          <div className={c["modal-content"]}>{content}</div>
        </div>
        {footer && <div className={c["modal-footer"]}>{footer}</div>}
      </div>
    </div>
  );
};