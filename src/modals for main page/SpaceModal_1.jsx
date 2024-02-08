import React, { useEffect } from 'react';
import './SpaceModal_1.css';

const SpaceModal_1 = ({ isOpen, close, children }) => {
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Make sure this matches your outer div's class name
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

export default SpaceModal_1;
