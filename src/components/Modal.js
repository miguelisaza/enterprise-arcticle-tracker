import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative px-4 py-10 shadow rounded-3xl sm:p-10 p-6 bg-white w-full max-w-md m-auto flex-col flex">
        <div className="modal-content">{children}</div>
        <button
          className="absolute top-0 right-0 cursor-pointer p-4 text-gray-600 hover:text-gray-800 transition duration-150"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;