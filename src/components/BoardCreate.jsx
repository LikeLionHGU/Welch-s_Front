import React, { useState, useRef } from 'react';
import '../styles/board/boardcreate.scss'; // CSS 파일을 생성하여 필요한 스타일을 정의하세요

const BoardCreate = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [fixed, setFixed] = useState(false);
    const [image, setImage] = useState(null);
    const modalBackground = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            id: Date.now(), // 고유 ID 생성 (예: 타임스탬프 사용)
            title,
            content,
            fixed,
            image,
        };
        onSubmit(newPost);
        onClose();
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className="create-modal-container" ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current) {
                onClose();
            }
        }}>
            <div className="create-modal-content">
                <button className="create-close-button" onClick={onClose}>×</button>
                {/* <h2>글 작성하기</h2> */}
                <form onSubmit={handleSubmit}>
                    <div className="create-form-title">
                        {/* <label htmlFor="title">제목</label> */}
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="제목은 생략이 가능합니다."
                        />
                    </div>
                    <div className="create-form-content">
                        {/* <label htmlFor="content">내용</label> */}
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            placeholder="작가들과 나누고 싶은 글을 작성해 주세요."
                        />
                    </div>
                    <div className="create-form-image">
                        <label htmlFor="image">이미지 첨부</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="create-form-fixed">
                        <label>
                            <input
                                type="checkbox"
                                checked={fixed}
                                onChange={(e) => setFixed(e.target.checked)}
                            />
                            상단 고정
                        </label>
                    </div>
                    <div className="create-form-actions">
                        <button type="submit">등록하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BoardCreate;
