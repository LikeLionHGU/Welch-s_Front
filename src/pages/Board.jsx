import React, { useState } from 'react';
import BoardContents from "../components/BoardContents";
import Header from "../components/Header";
import BoardCreate from "../components/BoardCreate";

export default function Board() {
    const [modalOpen, setModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);

    const handleCreatePost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="board-container">
            <Header mode={3} />
            <h2>게시판</h2>
            <button onClick={() => setModalOpen(true)}>
                글 작성하기
            </button>
            {modalOpen && (
                <BoardCreate
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleCreatePost}
                />
            )}
            {posts.map((post, index) => (
                <BoardContents key={index} post={post} loggedInUser="정망 선생" />
            ))}
        </div>
    );
}
