import React, { useState } from "react";
import Modal from "react-modal";

// mode === 0: approval
export default function ModalContainer({ isOpen, closeModal, style, mode }) {
  const [modalContents, setModalContents] = useState("");
  // const [openModal, setOpenModal] = useState(false);

  const handleTextareaChange = (e) => {
    setModalContents(e.target.value);
    // 관리자가 미승인 사유를 적은 것이 들어있는 데이타
    console.log(e.target.value);
  };

  // 누르면 모달 꺼지고 페이지 이동
  // const handleCloseModal = () => {
  //   setOpenModal(false);
  // };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      style={style}
      // 접근성 무시. 모달 오류날 경우 얘가 문제일수도
      ariaHideApp={false}
    >
      {mode === 0 ? (
        <div className="write-modal-contents-container">
          <div>미승인 사유</div>
          <textarea
            id="write-modal-contents-box"
            placeholder="수정해야 할 부분을 작성해 주세요."
            value={modalContents}
            onChange={handleTextareaChange}
          ></textarea>
          <div>
            <button
              onClick={() => {
                closeModal();
              }}
            >
              작성하기
            </button>
          </div>
        </div>
      ) : (
        <>hi</>
      )}
    </Modal>
  );
}
