import React from "react";
import Modal from "react-modal";

export default function ModalContainer({
  isOpen,
  closeModal,
  Contents,
  style,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      style={style}
    >
      <Contents />
    </Modal>
  );
}
