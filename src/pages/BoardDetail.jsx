import { useState, useEffect } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import CommentArrowImg from "../imgs/commentArrow.svg";
import GrayLikeImg from "../imgs/grayLike.svg";
import RedLikeImg from "../imgs/redLike.svg";
import axios from 'axios';


export default function BoardDetail() {
  const location = useLocation();
  const { id } = location.state || {};
  const [project, setProject] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsLike, setCommentsLike] = useState();
  const [commentList, setCommentList] = useState([]);
  const modalBackground = useRef();
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
                    withCredentials: true
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
                    withCredentials: true
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
            console.log("Post uploaded successfully");
            // alert("게시물 업로드 성공");
            navigate("/"); // 성공적으로 업로드 후 메인 페이지로 이동
            setComment("");
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
      }

    const Comment = ({ comment }) => (
        <div id="detail-comments-container">
            <div>{comment.user.name}</div>
            <div>{comment.createdDate}</div>
            <div>{comment.contents}</div>
            <img
                onClick={() => {
                    handleSetCommentsLike(comment.id);
                }}
                src={comment.isLike ? RedLikeImg : GrayLikeImg}
                alt="like"
            />
            <div>{comment.likeCount}</div>
            {comment.user.id === localStorage.getItem("id") ? <div onClick={()=> deleteComment(comment.id)}>삭제하기</div> : <></>}
        </div>
    );

    const handleSubmit = async () => {
        if (comment !== "") {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.post(
                    `https://likelion.info/community/comment/add`,
                    {
                        contents: comment,
                        postId: id
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
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
            setComment("");
        }
    };

    useEffect(() => {
        
        const fetchPost = () => {
            const token = localStorage.getItem("token");
            console.log("?!");
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
                    console.log(response.data);
                    setPost(response.data);
                    setCommentList(response.data.commentList);
                    // console.log(post);
                })
                .catch((error) => {
                    console.error("Error fetching project:", error);
                    localStorage.removeItem("token");
                    navigate("/", { replace: true });
                });
        };
        fetchPost();
    }, [post]);

    

    return (
        <div className='board-detail-container' ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current && modalBackground.current) {
                navigate(-1);
            }
        }}>
            <div className='board-detail-content'>
                <div className='board-detail-date'>
                    {post.createdDate}
                </div>
                <div className='board-detail-title'>
                    {post.title}
                </div>
                <div className='board-detail-content'>
                    {post.contents}
                </div>
                <div>
                    <img
                    src={post.imageAddress}
                    alt="img"
                    />
                </div>


                <div className='board-detail-like-container'>
                    <img
                        sec={post.isLike ? RedLikeImg : GrayLikeImg}
                        onClick={() => {
                            handleSetPostLike();
                        }}
                        alt='like'
                        style={{ width: "22px", height: "20px" }}
                    />
                </div>
                <div>{post.likeCount}</div>

                <div id="board-detail-comments-list">
                    <div id="detail-write-comments">
                        <input
                            type='text'
                            id="board-detail-write-container"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
                        />
                        <img
                            src={CommentArrowImg}
                            alt='comment'
                            disabled=""
                            onClick={() => {
                                handleSubmit();
                            }}
                        />
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


