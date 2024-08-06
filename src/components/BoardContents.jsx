import React, { useState, useEffect } from "react";
import axios from "axios";
import BoardUpdate from "./BoardUpdate";
import BoardDetail from "../pages/BoardDetail";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import BoardProfile from "../imgs/board_profile.png";
import Notification from "./Notification"; // 삭제 모달 컴포넌트 임포트
import SppechBubble from "../imgs/speechbubble.svg";
import More from "../imgs/board_more.svg";
import SppechBubbleDisabled from "../imgs/speechbubble_disabled.svg";
import "../styles/board/boardcontents.scss";
import { useNavigate } from "react-router-dom";
import ModalContainer from "./ModalContainer";
import { setDataInElement } from "ckeditor5";
import BoardCreate from "./BoardCreate";

const BoardContents = ({ post, loggedInUser }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [showBoardToggle, setShowBoardToggle] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleSetDetailModalOpen = () => {
    setDetailModalOpen(!detailModalOpen);
    console.log(detailModalOpen);
  };

  const detailModalStyle = {
    overlay: {
      zIndex: "1000",
      backgroundColor: " rgba(48, 48, 48, 0.4)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "800px", // 원하는 너비
      height: "650px", // 원하는 높이
      zIndex: "1001",
      borderRadius: "12px",
    },
  };

  const handleClick = (id) => {
    const user = localStorage.getItem("id");

    if (id === user) {
      navigate("/mypage");
    } else {
      navigate("/profile", { state: { id } });
    }
  };

  const handleLike = async (communityPostId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `https://likelion.info/community/post/like/switch/${communityPostId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Post liked/unliked successfully");
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      } else {
        console.error("Error toggling like");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in setting up request:", error.message);
      }
      console.error("Error toggling like:", error);
    }
  };

  const handleEdit = () => {
    console.log("Edit functionality not implemented yet");
  };

  const handleDelete = () => {
    setShowNotification(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`/api/posts/${post.id}`, { withCredentials: true })
      .then(() => {
        alert("게시물이 삭제되었습니다.");
        setShowNotification(false);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        localStorage.removeItem("token");
      });
  };

  const cancelDelete = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    setLiked(post.isLike);
    setLikeCount(post.likeCount);
  }, [post.isLike, post.likeCount]);

  const handlePostClick = () => {
    navigate("/boardDetail", { state: { id: post.id } });
  };

  const deletePost = async (postId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `https://likelion.info/post/community/delete/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Post uploaded successfully");
        // alert("게시물 업로드 성공");
        // navigate("/"); // 성공적으로 업로드 후 메인 페이지로 이동
        window.location.reload();
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

  //   const BoardToggle = ({ postId }) => {
  //     console.log("test -> ", postId);
  //     return (
  //       <div className="button-container">
  //         <button
  //           className="board-edit-button"
  //           onClick={() => setModalOpen(true)}
  //         >
  //           수정
  //         </button>
  //         <button
  //           className="board-delete-button"
  //           onClick={() => deletePost(postId)}
  //         >
  //           삭제
  //         </button>
  //         {modalOpen && (
  //           <BoardUpdate
  //             onClose={() => setModalOpen(false)}
  //             //onSubmit={}
  //             id={postId}
  //           />
  //         )}
  //       </div>
  //     );
  //   };

  // const handleOptionsToggle = () => {
  //     console.log("!!")
  //     setShowBoardToggle(!showBoardToggle);
  // };

  const handleOptionsToggle = (e) => {
    setShowBoardToggle(!showBoardToggle);
    e.stopPropagation();
  };

  const updatePost = async (postId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `https://likelion.info/post/community/delete/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Post uploaded successfully");
        // alert("게시물 업로드 성공");
        // navigate("/"); // 성공적으로 업로드 후 메인 페이지로 이동
        window.location.reload();
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
    <>
      <ModalContainer
        isOpen={detailModalOpen}
        closeModal={handleSetDetailModalOpen}
        style={detailModalStyle}
        mode={1}
        contents={""}
        id={post.id}
      />
      <div
        className="board-post"
        onClick={() => {
          handleSetDetailModalOpen();
        }}
      >
        <div className="post-header">
          <div className="post-profile">
            <img
              src={post.writer.profile}
              alt="avatar"
              className="avatar"
              onClick={() => {
                handleClick(post.writer.id);
              }}
            />
            <div className="user-info">
              <div
                className="username"
                onClick={() => {
                  handleClick(post.writer.id);
                }}
              >
                {post.writer.name}
              </div>
            </div>
          </div>
          <div className="post-detail">
            {
              post.writer.id === localStorage.getItem("id") && (
                <div id="board-contents-zumzumzum-btns">
                  <img
                    id="board-contents-zumzumzum"
                    src={More}
                    onClick={handleOptionsToggle}
                    alt=""
                  />
                  {showBoardToggle ? (
                    <div className="board-contents-btns">
                      <div
                        id="board-contents-update"
                        className="board-contents-update-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalOpen(true);
                        }}
                      >
                        수정
                      </div>
                      {modalOpen && (
                        <BoardCreate
                          onClose={() => setModalOpen(false)}
                          //   onSubmit={handleCreatePost}
                          //   id={id}
                        />
                      )}
                      <div
                        className="board-contents-update-delete"
                        id="board-contents-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePost(post.id);
                        }}
                      >
                        삭제
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )
              // :
              // <></>
            }
          </div>
        </div>
        <div className="post-content" onClick={() => setDetailModalOpen(true)}>
          {/* {detailmodalOpen && (
          <ModalContainer
            onClose={() => setDetailModalOpen(false)}
            id={post.id}
          />
        )} */}
          <h2 className="post-title">{post.title}</h2>
          {/* <p className="post-body" onClick={handlePostClick}>{post.contents}</p> 기존의 방법*/}
          <div className="post-body">{post.contents}</div>
        </div>
        <div className="post-footer">
          <button
            className="like-button"
            onClick={(e) => {
              e.stopPropagation();
              handleLike(post.id);
            }}
          >
            <FontAwesomeIcon
              icon={liked ? solidHeart : solidHeart}
              className={`heart-icon ${liked ? "liked" : "unliked"}`}
            />
            <span className="like-count">{likeCount}</span>
          </button>

          <button className="message-button">
            <img className="message-btn-img" src={SppechBubble} />
            <span className="message-count">{post.commentCount}</span>
          </button>
        </div>

        {showNotification && (
          <Notification
            message="정말로 삭제하시겠습니까?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </>
  );
};

export default BoardContents;
