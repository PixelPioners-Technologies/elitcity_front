import React from 'react';
import './PriceModal_1.css';



const PriceModal_1 = ({ isOpen, close, children }) => {
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

export default PriceModal_1;
