import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoardUpdate from './BoardUpdate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import BoardProfile from '../imgs/board_profile.png';
import Notification from './Notification'; // 삭제 모달 컴포넌트 임포트
import SppechBubble from '../imgs/speechbubble.svg';
import More from '../imgs/board_more.svg'
import SppechBubbleDisabled from '../imgs/speechbubble_disabled.svg';
import '../styles/board/boardcontents.scss';
import { useNavigate } from "react-router-dom";

const BoardContents = ({ post, loggedInUser }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [showBoardDetail, setShowBoardDetail] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    

    const handleClick = (id) => {
        const user = localStorage.getItem("id");
    
        if(id === user) {
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
    }

    const BoardDetail = ({postId}) => {
        console.log(postId);
        return (
            <div className="button-container">
                <button className="board-edit-button" 
                    onClick={() => setModalOpen(true)}>수정
                </button>
                <button className="board-delete-button" onClick={()=> deletePost(postId)}>삭제</button>
                {modalOpen && (
                <BoardUpdate
                    onClose={() => setModalOpen(false)}
                    //onSubmit={}
                    id={postId}
                />
            )}
            </div>
        );
    };

    const handleOptionsToggle = () => {
        
        setShowBoardDetail(!showBoardDetail);
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
    }
    

return (
    <div className="board-post">
        <div className="post-header">
            <div className='post-profile'>
                <img src={post.writer.profile} alt="avatar" className="avatar" onClick={() => {handleClick(post.writer.id)}} />
                <div className="user-info">
                    <div className="username" onClick={() => {handleClick(post.writer.id)}}>{post.writer.name}</div>
                </div>
            </div>
            <div className='post-detail'>
                {post.writer.id === localStorage.getItem("id") ?
                    <div>
                        <img
                            src={More}
                            onClick={handleOptionsToggle}
                        />
                        {showBoardDetail ? <BoardDetail postId={post.id}/> : <></>}
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
        <div className="post-content">
            <h2 className="post-title" onClick={handlePostClick} >{post.title}</h2>
            <p className="post-body">{post.contents}</p>
        </div>
        <div className="post-footer">
            <button className="like-button" onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}>
                <FontAwesomeIcon icon={liked ? solidHeart : solidHeart} className={`heart-icon ${liked ? 'liked' : 'unliked'}`} />
                <span className='like-count'>{likeCount}</span>
            </button>

            <button className="message-button">
                <img
                    className='message-btn-img'
                    src={SppechBubble}
                />
                <span className='message-count'>{post.commentCount}</span>
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