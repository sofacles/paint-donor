import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children }) => (
    ReactDOM.createPortal(
      <div className="screen">
          <div className="modal">
            {children}
          </div>
      </div>,
      document.getElementById('modal-root')
    )
  );

  export default Modal;