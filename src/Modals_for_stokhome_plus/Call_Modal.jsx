import React from 'react';
import './Call_Modal.css';

const Call_Modal = ({ isOpen, close, children }) => {
  if (!isOpen) return null;
  const openClass = isOpen ? 'open' : '';
  return (
    <div className={`modal-overlay-storkhome ${openClass}`} onClick={close}>
      <div className="modal-content-storkhome scale-up-top-storkhome" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Call_Modal;
