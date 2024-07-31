import React, { useState, useRef } from 'react';
import '../styles/board/boardcreate.scss'; // CSS 파일을 생성하여 필요한 스타일을 정의하세요

const BoardCreate = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const modalBackground = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content });
        onClose();
    };

    return (
        <div className="modal-container" ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current) {
                onClose();
            }
        }}>
            <div className="modal-content">
                <h2>글 작성하기</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">내용</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">등록</button>
                        <button type="button" onClick={onClose}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BoardCreate;
