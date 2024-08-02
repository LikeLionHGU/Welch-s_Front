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

    const handleSetProjectLike = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `https://likelion.info/post/community/like/${id}`,
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
                `https://likelion.info/project/comment/like/${commentId}`,
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

    const Comment = ({ comment }) => (
        <div id="detail-comments-container">
            <div>{comment.user.name}</div>
            <div>{comment.createdDate}</div>
            <div>{comment.contents}</div>
            <img
                onClick={() => {
                    handleSetCommentsLike(comment.id);
                }}
                src={comment.isLiked ? RedLikeImg : GrayLikeImg}
                alt="like"
            />
        </div>
    );

    const addComment = () => {
        if (comment !== "") {
            console.log(comment);
            setComment("");
        }
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        const request = {
            contents: comment
        };

        if (comment !== "") {
            try {
                const response = await axios.post(
                    `https://likelion.info/project/comment/add/${id}`,
                    request,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    }
                );

                if (response.status === 200) {
                    setComment("");
                    // Fetch comments again to include the new comment
                    fetchProject();
                } else {
                    console.error("Error adding comment");
                }
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    const fetchProject = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/", { replace: true });
            return;
        }

        axios
            .get(`https://likelion.info/project/get/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            })
            .then((response) => {
                setProject(response.data);
                setCommentList(response.data.commentList);
                setLike(response.data.isLiked);
                setLikeCount(response.data.likeCount);
            })
            .catch((error) => {
                console.error("Error fetching project:", error);
                localStorage.removeItem("token");
                navigate("/", { replace: true });
            });
    };

    useEffect(() => {
        fetchProject();
    }, [id]);

    return (
        <div className='board-detail-container' ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current) {
                navigate(-1);
            }
        }}>
            <div className='board-detail-content'>
                <div className='board-detail-date'>
                    2024년 8월 2일
                </div>
                <div className='board-detail-title'>
                    {project.title}
                </div>
                <div className='board-detail-content'>
                    content
                </div>
                <div className='board-detail-img'>
                    img
                </div>


                <div className='board-detail-like-container'>
                    <img
                        sec={like ? RedLikeImg : GrayLikeImg}
                        onClick={() => {
                            handleSetProjectLike();
                        }}
                        alt='like'
                        style={{ width: "22px", height: "20px" }}
                    />
                </div>
                <div>{likeCount}</div>

                <div id="board-detail-comments-list">
                    <div id="detail-write-comments">
                        <input
                            type='text'
                            id="board-detail-write-container"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyDown={(e) => (e.key === "Enter" ? addComment() : null)}
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


