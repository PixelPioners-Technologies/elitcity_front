import React from 'react';
import './Modal_1.css';

const Modal_1 = ({ isOpen, close, children }) => {
  if (!isOpen) return null;
  const openClass = isOpen ? 'open' : '';
  return (
    <div className={`modal-overlay ${openClass}`} onClick={close}>
      <div className="modal-content scale-up-top" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal_1;
