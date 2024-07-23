// 프로젝트 관리 페이지
import { useState } from "react";
import ModalContainer from "../../../components/ModalContainer";

export default function Setting() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <ModalContainer isOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
}
