import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import BoardProfile from '../imgs/board_profile.png';
import '../styles/board/boardcontents.scss'; // CSS 파일을 생성하여 필요한 스타일을 정의하세요

const BoardContents = ({ post, loggedInUser }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

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

    const handleDelete = () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            axios.delete(`/api/posts/${post.id}`, { withCredentials: true })
                .then(() => {
                    alert('게시물이 삭제되었습니다.');
                    // 게시물이 삭제된 후 추가 작업이 필요하다면 여기에 작성
                })
                .catch(error => {
                    console.error('Error deleting post:', error);
                });
        }
    };

    const handleEdit = () => {
        // 수정 기능을 추가하려면 여기에 작성
        alert('수정 기능은 아직 구현되지 않았습니다.');
    };

    return (
        <div className="board-post">
            <div className="post-header">
                <img src={BoardProfile} alt="avatar" className="avatar" />
                <div className="user-info">
                    <div className="username">정망 선생</div>
                    <>
                            <FontAwesomeIcon icon={faEllipsisV} className="options-icon" onClick={handleOptionsToggle} />
                            {showOptions && (
                                <div className="post-options">
                                    <button onClick={handleEdit}>수정</button>
                                    <button onClick={handleDelete}>삭제</button>
                                </div>
                            )}
                    </>
                    {/* {loggedInUser === "정망 선생" && (
                        <>
                            <FontAwesomeIcon icon={faEllipsisV} className="options-icon" onClick={handleOptionsToggle} />
                            {showOptions && (
                                <div className="post-options">
                                    <button onClick={handleEdit}>수정</button>
                                    <button onClick={handleDelete}>삭제</button>
                                </div>
                            )}
                        </>
                    )} */}
                </div>
            </div>
            <div className="post-content">
                <h2 className="post-title">게시물에서 참여자들과 함께 나누고 싶은 글, 탈퇴 관련 글, 의논하고 싶은 글에 대한 제목</h2>
                <p className="post-body">그러나, 겨울이 지나고 나의 별에도 봄이 오면, 무덤 위에 파란 잔디가 피어나듯이 내 이름자 묻힌 언덕 위에도 자랑처럼 풀이 무성할 거외다. 소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런 이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다. 나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어 버리었읍니다. 별 하나에 추억과 별 하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경과 별 하나에 시와 별 하나에 어머니, 어머니, 어머님, 나는 별 하나에 아름다운 말 한 마디씩 불러 봅니다. 딴은 밤을 세워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다. 딴은 밤을 세워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다. 딴은 밤을 세워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다. 나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어 버리었읍니다. 가슴 속에 하나 둘 새겨지는 별을 이제 다 못 헤는 것은 쉬이 아침이 오는 까닭이요, 내일 밤이 남은 까닭이요, 아직 나의 청춘이 다하지 않은 까닭입니다. 딴은 밤을 세워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다. 나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어 버리었읍니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 가슴 속에 하나 둘 새겨지는 별을 이제 다 못 헤는 것은 쉬이 아침이 오는 까닭이요, 내일 밤이 남은 까닭이요, 아직 나의 청춘이 다하지 않은 까닭입니다. 소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런 이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다.</p>
            </div>
            <div className="post-footer">
                <button className="like-button" onClick={handleLike}>
                    <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} className={`heart-icon ${liked ? 'liked' : ''}`} />
                    <span>{likeCount}</span>
                </button>
            </div>
        </div>
    );
};

export default BoardContents;
