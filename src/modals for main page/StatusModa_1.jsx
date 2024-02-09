import React, { useEffect } from 'react';
import './StatusModal_1.css';

const StatusModal_1 = ({ isOpen, close, children }) => {
  useEffect(() => {
    const handleDocumentClick = (e) => {
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
    <div className={`modal-overlay ${openClass}`}>
      <div className="modal-content1 scale-up-top1" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default StatusModal_1;
