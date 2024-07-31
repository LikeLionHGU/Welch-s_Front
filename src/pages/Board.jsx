import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoardContents from "../components/BoardContents";
import Header from "../components/Header";
import BoardCreate from "../components/BoardCreate";
import "../styles/board/board.scss";

export default function Board() {
    const [modalOpen, setModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);

    const handleCreatePost = async (newPost) => {
        // 서버에 새 게시글을 등록하는 post 요청
        try {
            const formData = new FormData();
            formData.append('title', newPost.title);
            formData.append('content', newPost.content);
            formData.append('fixed', newPost.fixed);
            if (newPost.image) {
                formData.append('image', newPost.image);
            }

            const response = await axios.post('https://your-api-endpoint.com/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // 서버 응답 데이터를 사용하여 상태 업데이트
            setPosts([response.data, ...posts]);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts',
        }).then(response => setPosts(response.data));
    }, []);

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
                <BoardContents key={index} post={post} loggedInUser={1} />
            ))}
        </div>
    );
}
