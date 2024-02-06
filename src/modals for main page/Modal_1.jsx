import React from 'react';
import './Modal_1.css';

const Modal_1 = ({ isOpen, close, children }) => {
  if (!isOpen) return null;
  const openClass = isOpen ? 'open' : '';
  return (
    <div className={`modal-overlay1 ${openClass}`} onClick={close}>
      <div className="modal-content1 scale-up-top1" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal_1;
