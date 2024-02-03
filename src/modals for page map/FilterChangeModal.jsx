import './FilterChangeModal.css'
import React from 'react';


const FilterChangeModal = ({ isOpen, close, children }) => {
  if (!isOpen) return null;
  const openClass = isOpen ? 'open' : '';
  return (
    <div className={`modal-overlay ${openClass}`} onClick={close}>
      <div className="modal-content2 scale-up-top" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default FilterChangeModal;
