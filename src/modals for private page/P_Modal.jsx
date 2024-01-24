import React from 'react';
import './P_Modal.css';

const P_Modal = ({ isOpen, close, children }) => {
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

export default P_Modal;
