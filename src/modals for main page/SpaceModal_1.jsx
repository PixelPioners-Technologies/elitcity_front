import React from 'react';
import './SpaceModal_1.css';



const SpaceModal_1 = ({ isOpen, close, children }) => {
  if (!isOpen) return null;
  const openClass = isOpen ? 'open' : '';

  return (
    <div className={`modal-overlay ${openClass}`} onClick={close}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default SpaceModal_1;
