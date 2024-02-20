import React, { useEffect } from 'react';
import './G_SpaceModal.css';

const G_SpaceModal = ({ isOpen, close, children }) => {
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Check if the click is outside the modal content
      if (isOpen && e.target.closest('.modal-content') === null) {
        close();
      }
    };

    // Attach the event listener to the entire document
    document.addEventListener('mousedown', handleDocumentClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;
  const openClass = isOpen ? 'open' : '';

  return (
    <div className={`modal-overlay ${openClass}`} onClick={close}>
      <div className="modal-content scale-up-tl make_thinner_ground_space" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default G_SpaceModal;
