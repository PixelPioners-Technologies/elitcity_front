import React, { useEffect } from 'react';
import './PriceModal_1.css';

const PriceModal_1 = ({ isOpen, close, children }) => {
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Ensure this class name matches your modal's outer div class name
      if (isOpen && e.target.closest('.modal-overlay') === null) {
        close();
      }
    };
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;
  const openClass = isOpen ? 'open' : '';

  return (
    <div className={`modal-overlay ${openClass}`} onClick={close}>
      <div className="modal-content1 scale-up-tl" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default PriceModal_1;
