import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BoardDetail from "../pages/BoardDetail";

// mode === 0: approval, mode === 1: board detail
export default function ModalContainer({
  isOpen,
  closeModal,
  style,
  mode,
  contents,
  id,
}) {
  const [modalContents, setModalContents] = useState("");
  // const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleTextareaChange = (e) => {
    setModalContents(e.target.value);
    // 관리자가 미승인 사유를 적은 것이 들어있는 데이타
    console.log(e.target.value);
  };

  // 누르면 모달 꺼지고 페이지 이동
  // const handleCloseModal = () => {
  //   setOpenModal(false);
  // };

  const approvePost = async (isAllowed, rejectedReason) => {
    const token = localStorage.getItem("token");
    const value = {
      contents: contents,
      id: id,
      rejectedReason: rejectedReason,
      isAllowed: isAllowed,
    };

    try {
      const response = await axios.patch(
        `https://likelion.info/post/confirm`,
        value,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Post uploaded successfully");
        alert("게시물 업로드 성공");
        // window.location.reload();
      } else {
        console.error("Error uploading post");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in setting up request:", error.message);
      }
      console.error("Error uploading post:", error);
      alert(`Error uploading post: ${error.message}`);
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  };

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
                approvePost(false, modalContents);
                closeModal();
              }}
            >
              작성하기
            </button>
          </div>
        </div>
      ) : (
        <BoardDetail id={id} />
      )}
    </Modal>
  );
}
