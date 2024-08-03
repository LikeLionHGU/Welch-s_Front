import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import BoardProfile from '../imgs/board_profile.png';
import Notification from './Notification'; // 삭제 모달 컴포넌트 임포트
import '../styles/board/boardcontents.scss';
import { useNavigate } from "react-router-dom";

const BoardContents = ({ post, loggedInUser }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);

    const handleLike = async (communityPostId) => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `https://likelion.info/community/post/like/switch/${communityPostId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
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

    const handleOptionsToggle = () => {
        setShowOptions(!showOptions);
    };

    const handleEdit = () => {
        console.log("Edit functionality not implemented yet");
    }

    const handleDelete = () => {
        setShowNotification(true);
    };

    const confirmDelete = () => {
        axios.delete(`/api/posts/${post.id}`, { withCredentials: true })
            .then(() => {
                alert('게시물이 삭제되었습니다.');
                setShowNotification(false);
            })
            .catch(error => {
                console.error('Error deleting post:', error);
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

    return (
        <div className="board-post" onClick={handlePostClick}>
            <div className="post-header">
                <img src={BoardProfile} alt="avatar" className="avatar" />
                <div className="user-info">
                    <div className="username">{post.writer.name}</div>
                </div>
            </div>
            <div className="post-content">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-body">{post.contents}</p>
            </div>
            <div className="post-footer">
                <button className="like-button" onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}>
                    <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} className={`heart-icon ${liked ? 'liked' : ''}`} />
                    <span>{likeCount}</span>
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
    );
};

export default BoardContents;
