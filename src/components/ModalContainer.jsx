import React from "react";
import Modal from "react-modal";

export default function ModalContainer({ isOpen, closeModal }) {
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Modal">
        <h2>Hello</h2>
        {/* <button onClick={closeModal}>close</button> */}
      </Modal>
    </div>
  );
}
