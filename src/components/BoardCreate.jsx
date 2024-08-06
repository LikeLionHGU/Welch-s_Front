import React, { useState, useRef, useEffect } from 'react';
import '../styles/board/boardcreate.scss';
import { useNavigate } from "react-router-dom";
import IMG from "../imgs/board_img.svg"
import Delete from "../imgs/delete.png"
import axios from "axios";

const BoardCreate = ({ onClose, onSubmit, id, postId, isUpdate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('이미지 첨부'); // 파일 이름을 저장할 상태 추가
  const modalBackground = useRef();
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const newPost = {
  //         id: Date.now(), // 고유 ID 생성 (예: 타임스탬프 사용)
  //         title,
  //         content,
  //         fixed,
  //         image,
  //     };
  //     onSubmit(newPost);
  //     onClose();
  // };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchBestProjects = () => {
      axios
        .get(`https://likelion.info/post/community/get/one/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setTitle(response.title);
          setContent(response.contents);
          setImage(response.imageAddress);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          navigate("/", { replace: true });
        });
    };




    if(isUpdate) {
      fetchBestProjects();
    }
  }, []);

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const value = {
      title: title,
      projectId: id,
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
      const response = await axios.post(
        "https://likelion.info/post/community/upload",
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
    <div className="create-modal-container" ref={modalBackground} onClick={e => {
      if (e.target === modalBackground.current) {
        onClose();
      }
    }}>
      
      <div className="create-modal-content">
        <img
          src={Delete}
          className="create-close-button"
          onClick={onClose}
        />
        {/* <button className="create-close-button" onClick={onClose}>×</button> */}
        {/* <h2>글 작성하기</h2> */}
        <form onSubmit={handleSubmit}>
          <div className="create-form-title">
            {/* <label htmlFor="title">제목</label> */}
            <input
              className='board-create-title'
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
              className='board-create-content'
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="작가들과 나누고 싶은 글을 작성해 주세요."
            />
          </div>
          <div className='board-create-footer'>
            <div className="create-form-image" onClick={() => document.getElementById('image').click()}>
              <img 
                className='img'
                src={IMG} 
              />
              <div className='img-title'>{imageName}</div>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }} // 파일 입력 요소 숨기기
              />
            </div>
            <div className="create-form-actions">
              <button className="board-create-btn" type="submit">등록하기</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardCreate;
