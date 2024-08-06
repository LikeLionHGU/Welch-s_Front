import React, { useState, useRef } from 'react';
import '../styles/board/boardupdate.scss';
import { useNavigate } from "react-router-dom";
import IMG from "../imgs/board_img.svg"
import Delete from "../imgs/delete.png"
import axios from "axios";

const BoardUpdate = ({ onClose, onSubmit, id }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('이미지 첨부'); // 파일 이름을 저장할 상태 추가
    const modalBackground = useRef();
    const navigate = useNavigate();
    console.log(id, "!?!?!?!?!?");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");

        const value = {
            title: title,
            postId: id,
            contents: content
        };

        console.log(value);
        const formData = new FormData();
        formData.append("file", image);
        formData.append(
            "post",
            new Blob([JSON.stringify(value)], {
                type: "application/json",
            })
        );

        try {
            const response = await axios.patch(
                "https://likelion.info/post/community/update",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
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

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setImageName(e.target.files[0].name); // 파일 이름 업데이트
        }
    };

    return (
        <div className="update-modal-container" ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current) {
                onClose();
            }
        }}>
            <div className="update-modal-content">
                <img
                    src={Delete}
                    className="update-close-button"
                    onClick={onClose}
                />
                {/* <button className="update-close-button" onClick={onClose}>×</button> */}
                {/* <h2>글 작성하기</h2> */}
                <form onSubmit={handleSubmit}>
                    <div className="update-form-title">
                        {/* <label className='board-update-title'>제목</label> */}
                        <input
                            className='board-update-title'
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder=""
                        />
                    </div>
                    <div className="update-form-content">
                        {/* <label htmlFor="content">내용</label> */}
                        <textarea
                            className='board-update-content'
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            placeholder="작가들과 나누고 싶은 글을 작성해 주세요."
                        />
                    </div>
                    <div className='board-update-footer'>
                        <div className="update-form-image" onClick={() => document.getElementById('image').click()}>
                            <img
                                className='update-img'
                                src={IMG}
                            />
                            <div className='update-img-title'>{imageName}</div>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }} // 파일 입력 요소 숨기기
                            />
                        </div>
                        <div className="update-form-actions">
                            <button className="board-update-btn" type="submit">등록하기</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BoardUpdate;
