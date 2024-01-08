import React from 'react';
import './SpaceModal.css';



const SpaceModal = ({ isOpen, close, children }) => {
  if (!isOpen) return null;
  const openClass = isOpen ? 'open' : '';

  return (
    <div className={`modal-overlay ${openClass}`} onClick={close}>
      <div className="modal-content scale-up-tl" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default SpaceModal;
