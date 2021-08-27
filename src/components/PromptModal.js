import React from "react";
import Modal from "react-modal";

export default function PromptModal({ showPrompt, togglePrompt, handleClick }) {
  Modal.setAppElement("#root");

  return (
    <div>
      <Modal
        isOpen={showPrompt}
        closeTimeoutMS={500}
        onRequestClose={togglePrompt}
        contentLabel=""
        className="prompt"
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <div className="card">
          <div className="card-header">Confirm Delete?</div>

          <div className="card-body d-flex align-items-center justify-content-center">
            <button className="btn btn-primary me-2" onClick={handleClick}>
              Yes
            </button>
            <button className="btn btn-danger" onClick={togglePrompt}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
