import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/board/boarddetail.scss";
import CommentArrowImg from "../imgs/commentArrow.svg";
import GrayLikeImg from "../imgs/grayLike.svg";
import RedLikeImg from "../imgs/redLike.svg";
import Delete from "../imgs/delete.png";
import More from "../imgs/board_more.svg";
import Zumzumzum from "../imgs/zzumzzumzzum.svg";
import axios from "axios";

export default function BoardDetail({ id }) {
  const [likeCount, setLikeCount] = useState(0);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsLike, setCommentsLike] = useState();
  const [commentList, setCommentList] = useState([]);
  const navigate = useNavigate();
  const [post, setPost] = useState("");

  const handleSetPostLike = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `https://likelion.info/post/community/comment/like/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setLike(!like);
        setLikeCount(like ? likeCount - 1 : likeCount + 1);
      } else {
        console.error("Error toggling like");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleSetCommentsLike = async (commentId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `https://likelion.info/community/comment/like/switch/${commentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setCommentsLike(!commentsLike);
      } else {
        console.error("Error toggling comment like");
      }
    } catch (error) {
      console.error("Error toggling comment like:", error);
    }
  };

  const deleteComment = async (commentId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `https://likelion.info/community/comment/delete/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Post deleted successfully");
        setCommentList(
          commentList.filter((comment) => comment.id !== commentId)
        ); // 삭제된 댓글 제거
      } else {
        console.error("Error deleting comment");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in setting up request:", error.message);
      }
      console.error("Error deleting comment:", error);
      alert(`Error deleting comment: ${error.message}`);
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  };

  const Comment = ({ comment }) => {
    const [toggleDelete, setToggleDelete] = useState(false);

    const handleToggleDelete = () => {
      setToggleDelete(!toggleDelete);
      console.log(toggleDelete);
    };
    console.log(comment);
    return (
      <div id="detail-comments-real-container">
        <div id="detail-comments-container">
          <div className="board-detail-comments-header">
            <div className="board-detail-comments-name">
              {comment.user.name}
            </div>
            <div className="board-detail-comments-toggle">
              {comment.write === localStorage.getItem("id") && (
                <div>
                  <img src={More} alt="more" />
                </div>
              )}
            </div>
          </div>
          <div className="board-detail-comments-date">
            {comment.createdDate}
          </div>
          <div className="board-detail-comments-contents">
            {comment.contents}
          </div>
          <div className="board-detail-comments-likebtn">
            <img
              className="board-detail-comments-like-img"
              onClick={() => handleSetCommentsLike(comment.id)}
              src={comment.isLike ? RedLikeImg : GrayLikeImg}
              alt="like"
            />
            <div className="board-detail-comments-likecount">
              {comment.likeCount}
            </div>
          </div>
        </div>
        <div id="board-detail-comment-btns">
          <div
            id="board-detail-comment-zumzumzum-container"
            onClick={() => {
              handleToggleDelete();
            }}
          >
            <img
              src={Zumzumzum}
              alt="zumzumzum"
              id="board-detail-comment-zumzumzum"
            />
          </div>
          {toggleDelete ? (
            <div
              id="board-detail-comment-remove-btn"
              onClick={() => {
                deleteComment(comment.id);
              }}
            >
              삭제
            </div>
          ) : (
            <div
              id="board-detail-comment-remove-btn"
              style={{ border: "none" }}
            ></div>
          )}
        </div>
        <div className="board-detail-comments-bottom"></div>
      </div>
    );
  };

  const handleSubmit = async () => {
    console.log(id);
    if (comment !== "") {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.post(
          `https://likelion.info/community/comment/add`,
          {
            contents: comment,
            postId: id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setCommentList([...commentList, response.data]); // 새로운 댓글 추가
        } else {
          console.error("Error adding comment");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
      setComment("");
    }
  };

  useEffect(() => {
    const fetchPost = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/", { replace: true });
        return;
      }

      axios
        .get(`https://likelion.info/post/community/get/one/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setPost(response.data);
          setCommentList(response.data.commentList);
        })
        .catch((error) => {
          console.error("Error fetching project:", error);
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        });
    };
    fetchPost();
  }, [id, navigate]);

  return (
    <div className="board-detail-container" style={{ overflowY: "hidden" }}>
      <div className="board-modal-detail-content">
        <img src={Delete} className="create-close-button" alt="close" />
        <div className="board-detail-date">{post.createdDate}</div>
        <div className="board-detail-title">{post.title}</div>
        <div className="board-detail-content">{post.contents}</div>
        <div>
          {post.imageAddress && (
            <img
              className="board-detail-img"
              src={post.imageAddress}
              alt="img"
            />
          )}
        </div>
        <div className="board-detail-like-container">
          <img
            className="board-detail-like-img"
            src={post.isLike ? RedLikeImg : GrayLikeImg}
            onClick={handleSetPostLike}
            alt="like"
          />
          <div className="board-detail-like-count">{post.likeCount}</div>
        </div>
        <div id="board-detail-comments-list">
          <div id="detail-write-comments">
            <input
              type="text"
              id="board-detail-write-container"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
            />
            <img src={CommentArrowImg} alt="comment" onClick={handleSubmit} />
          </div>
          <div id="board-detail-comments-container">
            {commentList.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
