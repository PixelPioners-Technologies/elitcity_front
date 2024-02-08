import './SaleModal.css'

export default function SaleModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop_sale">
      <div className="modal-content_sale">
        {/* <button onClick={onClose}>Close</button> */}
        {children}
      </div>
    </div>
  );
}


