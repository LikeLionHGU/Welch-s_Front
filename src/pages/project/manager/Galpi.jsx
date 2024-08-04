import React, { useState, useEffect } from "react";
import PeopleSlide from '../../../components/PeopleSlide';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../../styles/galpi.scss";

export default function Galpi() {
  const navigate = useNavigate();
  const location = useLocation();
  const [galpimanange, setGalpiManange] = useState([{
    profileImg: "",
    name: "",
  }]);

  const [collaborate, setCollaborate] = useState(true);
  const [concurrentWork, setConcurrentWork] = useState(true);
  const { id } = location.state || {}; // 프로젝트 아이디
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [galpilist, setGalpilist] = useState([
    {
      id: 1,
      topic: "선택된 갈피 :",
      children: [
        {
          id: 11,
          topic: "갈피 1",
        },
        {
          id: 12,
          topic: "갈피 2",
        },
      ]
    }
  ]);

  const handleSubmit = async (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();

    const value = {
      name: name,
      isSameTime: concurrentWork,
      isShared: collaborate,
      projectId: id,
    };

    try {
      const response = await axios.post(
        `https://likelion.info/bookmark/add`,
        value,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        console.log("Post uploaded successfully");
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

  const ListButton = ({ items, onChildClick }) => {
    return (
      <div className="list-button-container">
        {items.map(item => (
          <div key={item.id}>
            <div className="list-button-parent">
              {item.topic}
            </div>
            {item.children && item.children.map(child => (
              <div key={child.id} className="list-button-child" onClick={() => onChildClick(child, item.id)}>
                {child.topic}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const handleChildClick = (child, parentId) => {
    console.log(`You clicked on ${child.topic}`);
    updateParentTopic(child, parentId);
  };

  const updateParentTopic = (selectedChild, parentId) => {
    setGalpilist((prevList) => {
      const updatedList = prevList.map(parent => {
        if (parent.id === parentId) {
          return {
            ...parent,
            topic: `선택된 갈피 : ${selectedChild.topic}`,
          };
        }
        return parent;
      });
      return updatedList;
    });
  };

  const handleCollaborateChange = (value) => {
    setCollaborate(value);
  }

  const handleConcurrentWorkChange = (value) => {
    setConcurrentWork(value);
  }

  const handlePopupMessage = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className='galpi-setting-container'>
      <form onSubmit={handleSubmit}>
        <div className='galpi-title'>갈피 설정/관리</div>

        <div className='galpi-menu'>
          <div className='galpi-list'>
            <div className="galpi-sub-title">갈피 목록</div>
            <div>
              <ListButton items={galpilist} onChildClick={handleChildClick} />
            </div>
          </div>
        </div>
        <div>
          <div className='galpi-menu'>
            <div className="galpi-sub-title">갈피 제목</div>
            <input
              className="galpi-title-input"
              placeholder="갈피 이름을 입력해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className='galpi-menu'>
          <div className="galpi-sub-title">갈피 관리자</div>
          <div className="galpi-manage-plus" onClick={handlePopupMessage}>
            <div className="galpi-plus">+</div>
            <div className="galpi-manage">관리자 추가</div>
          </div>
          <div><PeopleSlide mode={2} data={galpimanange} /></div>
        </div>

        <div className='galpi-menu'>
          <div className="galpi-sub-title">공동 작업 가능 여부</div>
          <div>
            <div className='collaborate-radio-item'>
              <input
                className="radio"
                type="radio"
                id="collaborate-possible"
                name="collaborate"
                value="가능"
                checked={collaborate === true}
                onChange={() => handleCollaborateChange(true)}
              />
              <label htmlFor='collaborate-possible'>가능</label>
            </div>
            <div className='collaborate-radio-item'>
              <input
                className="radio"
                type="radio"
                id="collaborate-impossible"
                name="collaborate"
                value="불가능"
                checked={collaborate === false}
                onChange={() => handleCollaborateChange(false)}
              />
              <label htmlFor='collaborate-impossible'>불가능</label>
            </div>
          </div>
        </div>

        <div className='galpi-menu'>
          <div className="galpi-sub-title">동시 작업 가능 여부</div>
          <div>
            <div className='concurrentWork-radio-item'>
              <input
                className="radio"
                type="radio"
                id="concurrentWork-possible"
                name="concurrentWork"
                value="가능"
                checked={concurrentWork === true}
                onChange={() => handleConcurrentWorkChange(true)}
              />
              <label htmlFor='concurrentWork-possible'>가능</label>
            </div>
            <div className='concurrentWork-radio-item'>
              <input
                className="radio"
                type="radio"
                id="concurrentWork-impossible"
                name="concurrentWork"
                value="불가능"
                checked={concurrentWork === false}
                onChange={() => handleConcurrentWorkChange(false)}
              />
              <label htmlFor='concurrentWork-impossible'>불가능</label>
            </div>
          </div>
        </div>

        <button type="submit">저장하기</button>
      </form>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
              <div className="modal-body">
                <PeopleSlide mode={2} data={galpimanange} />
              </div>
            <button className="modal-save-button" onClick={() => setIsModalOpen(false)}>
              저장하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
