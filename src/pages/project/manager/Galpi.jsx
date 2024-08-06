import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../../../styles/galpi.scss";

export default function Galpi() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collaborate, setCollaborate] = useState(true);
  const [concurrentWork, setConcurrentWork] = useState(true);
  const { id } = location.state || {}; // 프로젝트 아이디
  const [name, setName] = useState("");

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
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
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

  const handleCollaborateChange = (value) => {
    setCollaborate(value);
  };

  const handleConcurrentWorkChange = (value) => {
    setConcurrentWork(value);
  };

  console.log(collaborate);
  console.log(concurrentWork);
  return (
    <div className="galpi-setting-container">
      <form onSubmit={handleSubmit}>
        <div className="galpi-title">갈피 생성</div>

        <div className="galpi-menu">
          <div className="galpi-list">
            {/* <div className="galpi-sub-title">갈피 목록</div> */}
            <div>
              {/* <ListButton items={galpilist} onChildClick={handleChildClick} /> */}
            </div>
          </div>
        </div>
        <div>
          <div className="galpi-menu">
            <div className="galpi-sub-title">갈피 제목</div>
            <input
              className="galpi-title-input"
              placeholder="갈피 이름을 입력해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="galpi-menu">
          <div className="galpi-sub-title">공동 작업 가능 여부</div>
          <div>
            <div className="collaborate-radio-item">
              <input
                className="radio"
                type="radio"
                id="collaborate-possible"
                name="collaborate"
                value="가능"
                checked={collaborate === true}
                onChange={() => handleCollaborateChange(true)}
              />
              <label htmlFor="collaborate-possible">가능</label>
            </div>
            <div className="collaborate-radio-item">
              <input
                className="radio"
                type="radio"
                id="collaborate-impossible"
                name="collaborate"
                value="불가능"
                checked={collaborate === false}
                onChange={() => handleCollaborateChange(false)}
              />
              <label htmlFor="collaborate-impossible">불가능</label>
            </div>
          </div>
        </div>

        <div className="galpi-menu">
          <div className="galpi-sub-title">동시 작업 가능 여부</div>
          <div>
            <div className="concurrentWork-radio-item">
              <input
                className="radio"
                type="radio"
                id="concurrentWork-possible"
                name="concurrentWork"
                value="가능"
                checked={concurrentWork === true}
                onChange={() => handleConcurrentWorkChange(true)}
              />
              <label htmlFor="concurrentWork-possible">가능</label>
            </div>
            <div className="concurrentWork-radio-item">
              <input
                className="radio"
                type="radio"
                id="concurrentWork-impossible"
                name="concurrentWork"
                value="불가능"
                checked={concurrentWork === false}
                onChange={() => handleConcurrentWorkChange(false)}
              />
              <label htmlFor="concurrentWork-impossible">불가능</label>
            </div>
          </div>
        </div>
        <div id="galpi-submit-btn-container">
          {name === "" ? (
            <button id="galpi-submit-btn-gray">저장하기</button>
          ) : (
            <button type="submit" id="galpi-submit-btn-green">
              저장하기
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
