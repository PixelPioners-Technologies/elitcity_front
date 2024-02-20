
import React, {useEffect} from 'react';
import './P_Modal.css';

const P_Modal = ({ isOpen, close, children }) => {

  useEffect(() => {
    const handleDocumentClick = (e) => {
      // This checks if the click is outside by looking for the closest element with '.modal-overlay'
      // If no such element is found, it means the click is outside the modal area.
      if (isOpen && e.target.closest('.modal-overlay') === null) {
        close(); // Close the modal if the click is outside
      }
    };

    // Add the event listener to the document to capture all mousedown events
    document.addEventListener('mousedown', handleDocumentClick);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isOpen, close]); // Dependency array to re-run the effect when `isOpen` or `close` changes

  // Do not render the modal in the DOM if it's not open
  if (!isOpen) return null;

  // Use `openClass` to control the visibility of the modal overlay based on `isOpen`
  const openClass = isOpen ? 'open' : '';
  
  return (
    <div className={`modal-overlay ${openClass}`} onClick={close}>
      <div className="modal-content scale-up-top  make_thinner_ground_location" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default P_Modal;
