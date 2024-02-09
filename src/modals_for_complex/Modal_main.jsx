import React from 'react';
import './Modal_main.css';

const Modal_1 = ({ isOpen, close, children }) => {
  if (!isOpen) return null;
  const openClass = isOpen ? 'open' : '';
  return (
    <div className={`modal-overlay ${openClass}`} onClick={close}>
      <div className="modal-content-complex scale-up-top1" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal_1;
