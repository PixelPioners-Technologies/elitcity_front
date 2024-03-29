import React from 'react';
import './G_Modal.css';

const G_Modal = ({ isOpen, close, children }) => {
  if (!isOpen) return null;
  const openClass = isOpen ? 'open' : '';
  return (
    <div className={`modal-overlay ${openClass}`} onClick={close}>
      <div className="modal-content scale-up-top  make_thinner_ground_location" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default G_Modal;
