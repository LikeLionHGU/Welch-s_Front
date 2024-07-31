import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import BoardProfile from '../imgs/board_profile.png';
import Notification from './Notification'; // 삭제 모달 컴포넌트 임포트
import '../styles/board/boardcontents.scss'; 

const BoardContents = ({ post, loggedInUser }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleLike = () => {
        const newLikeCount = liked ? likeCount - 1 : likeCount + 1;
        setLikeCount(newLikeCount);
        setLiked(!liked);

        // 서버에 좋아요 상태 업데이트 요청
        axios.post(`/api/posts/${post.id}/likes`, { liked: !liked }, { withCredentials: true })
            .catch(error => {
                console.error('Error updating like status:', error);
            });
    };

    const handleOptionsToggle = () => {
        setShowOptions(!showOptions);
    };

    const handleEdit = () => {
        <div>아직 수정 안했습니다</div>
    }

    const handleDelete = () => {
        setShowNotification(true);
    };

    const confirmDelete = () => {
        axios.delete(`/api/posts/${post.id}`, { withCredentials: true })
            .then(() => {
                alert('게시물이 삭제되었습니다.');
                // 삭제된 후 페이지를 새로고침하거나 게시물을 다시 불러오는 등의 추가 작업
                setShowNotification(false);
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    };

    const cancelDelete = () => {
        setShowNotification(false);
    };

    return (
        <div className="board-post">
            <div className="post-header">
                <img src={BoardProfile} alt="avatar" className="avatar" />
                <div className="user-info">
                    <div className="username">{post.userId}</div>
                    {loggedInUser === post.userId && (
                        <>
                            <FontAwesomeIcon icon={faEllipsisV} className="options-icon" onClick={handleOptionsToggle} />
                            {showOptions && (
                                <div className="post-options">
                                    <button onClick={handleEdit}>수정</button>
                                    <button onClick={handleDelete}>삭제</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="post-content">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-body">{post.body}</p>
            </div>
            <div className="post-footer">
                <button className="like-button" onClick={handleLike}>
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
