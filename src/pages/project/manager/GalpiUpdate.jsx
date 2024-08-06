import React, { useState, useEffect } from "react";
import PeopleSlide from "../../../components/PeopleSlide";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../../../styles/galpimanage.scss";

export default function GalpiUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const [galpimanange, setGalpiManange] = useState([
    
  ]);

  const [collaborate, setCollaborate] = useState(true);
  const [concurrentWork, setConcurrentWork] = useState(true);
  const { id } = location.state || {}; // 갈피 아이디
  const [setting, setSetting] = useState("");






  const handleCollaborateChange = (event) => {
    
    setCollaborate(!collaborate);
    
  };

  const handleConcurrentWorkChange = (event) => {
    
    setConcurrentWork(!concurrentWork);
    
  };

  const handleSubmit = async (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    // 서버로 데이터 전송 등의 로직 추가

    // const value = {
    //   name: title,
    //   category: categoriesString,
    //   description: description, // 한 줄 소개
    //   information: information, // 책 정보
    //   isPublic: visibility === "공개",
    //   maximumNumber: people,
    //   isFinished: false,
    //   isRecruit: true,
    // }; // 이 안에 request body 넣기

    try {
      const response = await axios.post(
        `https://likelion.info/bookmark/add/${id}`, // project id
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            withCredentials: true,
          },
        }
      );

      if (response.status === 200) {
        console.log("Post uploaded successfully");
        // alert("게시물 업로드 성공");
        navigate("/"); // 성공적으로 업로드 후 메인 페이지로 이동
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

  const AccordionItem = ({ item, isOpen, onClick, onChildClick }) => (
    <div className="accordion-item">
      <button className="accordion-header" onClick={onClick}>
        {item.topic}
      </button>
      {isOpen && (
        <div className="accordion-body">
          {item.children &&
            item.children.map((child) => (
              <button
                key={child.id}
                className="accordion-child"
                onClick={() => onChildClick(child, item.id)}
              >
                {child.topic}
              </button>
            ))}
        </div>
      )}
    </div>
  );

  const AccordionList = ({ items, onChildClick }) => {
    const [openItemId, setOpenItemId] = useState(null);

    const handleClick = (id) => {
      setOpenItemId(openItemId === id ? null : id);
    };

    return (
      <div className="accordion-list">
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={item.id === openItemId}
            onClick={() => handleClick(item.id)}
            onChildClick={onChildClick}
          />
        ))}
      </div>
    );
  };

  // const handleChildClick = (child, parentId) => {
  //   alert(`You clicked on ${child.topic}`);
  //   updateParentTopic(child, parentId);
  // };

  // const updateParentTopic = (selectedChild, parentId) => {
  //   setGalpilist((prevList) => {
  //     const updatedList = prevList.map((parent) => {
  //       if (parent.id === parentId) {
  //         return {
  //           ...parent,
  //           topic: selectedChild.topic, // 부모 항목의 제목을 선택된 항목으로 변경하기 !!
  //         };
  //       }
  //       return parent;
  //     });
  //     return updatedList;
  //   });
  // };

  useEffect(() => {
    
    const fetchSetting = () => {
      const token = localStorage.getItem("token");

      axios
        .get(`https://likelion.info/bookmark/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setSetting(response.data);
          setCollaborate(response.data.isShared);
          setGalpiManange(response.data.userList);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          navigate("/", { replace: true });
        });
    };

    

    fetchSetting();
    console.log(setting, " 123123 123 123 1231");


  }, []);

  return (
    <div className="galpi-update-setting-container">
      <form onSubmit={handleSubmit}>
        <div className="galpi-title">갈피 설정/관리</div>

        <div className="galpi-update-menu">
          <div className="galpi-update-sub-title">갈피 관리자</div>
          <div>
            <PeopleSlide mode={1} data={galpimanange} />
          </div>
        </div>

        <div className="galpi-update-menu">
          <div className="galpi-update-sub-title">공동 작업 가능 여부</div>
          <div>
            <div className="collaborate-radio-item">
              <input
                className="update-radio"
                type="radio"
                id="collaborate-possible"
                name="collaborate"
                value="가능"
                checked={collaborate}
                onChange={handleCollaborateChange}
              />
              <label htmlFor="collaborate-possible">가능</label>
            </div>
            <div className="collaborate-radio-item">
              <input
                className="update-radio"
                type="radio"
                id="collaborate-impossible"
                name="collaborate"
                value="불가능"
                checked={!collaborate}
                onChange={handleCollaborateChange}
              />
              <label htmlFor="collaborate-impossible">불가능</label>
            </div>
          </div>
        </div>

        <div className="galpi-update-menu">
          <div className="galpi-update-sub-title">동시 작업 가능 여부</div>
          <div>
            <div className="concurrentWork-radio-item">
              <input
                className="update-radio"
                type="radio"
                id="concurrentWork-possible"
                name="concurrentWork"
                value="가능"
                checked={concurrentWork}
                onChange={handleConcurrentWorkChange}
              />
              <label htmlFor="concurrentWork-possible">가능</label>
            </div>
            <div className="concurrentWork-radio-item">
              <input
                className="update-radio"
                type="radio"
                id="concurrentWork-impossible"
                name="concurrentWork"
                value="불가능"
                checked={!concurrentWork}
                onChange={handleConcurrentWorkChange}
              />
              <label htmlFor="concurrentWork-impossible">불가능</label>
            </div>
          </div>
        </div>

        <div className="galpi-update-btn-container">
          <button className="galpi-update-btn" type="submit">저장하기</button>
        </div>

      </form>
    </div>
  );
}
