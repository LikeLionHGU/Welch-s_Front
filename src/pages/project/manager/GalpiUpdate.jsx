import React, { useState, useEffect } from "react";
import PeopleSlide from '../../../components/PeopleSlide';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function GalpiUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const [galpimanange, setGalpiManange] = useState([{
    profileImg: "",
    name: "",
  }]);

  const [collaborate, setCollaborate] = useState("가능");
  const [concurrentWork, setConcurrentWork] = useState("가능");
  const { id } = location.state || {}; // 프로젝트 아이디

  const [galpilist, setGalpilist] = useState([
    {
      id: 1,
      topic: "갈피 목록",
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

  const handleCollaborateChange = (event) => {
    const newCollaborate = event.target.value;
    setCollaborate(newCollaborate);
    console.log(newCollaborate);
  }

  const handleConcurrentWorkChange = (event) => {
    const newConcurrentWork = event.target.value;
    setConcurrentWork(newConcurrentWork);
    console.log(newConcurrentWork);
  }

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
            withCredentials: true
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



  }

  const AccordionItem = ({ item, isOpen, onClick, onChildClick }) => (
    <div className="accordion-item">
      <button className="accordion-header" onClick={onClick}>
        {item.topic}
      </button>
      {isOpen && (
        <div className="accordion-body">
          {item.children && item.children.map(child => (
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
        {items.map(item => (
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

  const handleChildClick = (child, parentId) => {
    alert(`You clicked on ${child.topic}`);
    updateParentTopic(child, parentId);
  };

  const updateParentTopic = (selectedChild, parentId) => {
    setGalpilist((prevList) => {
      const updatedList = prevList.map(parent => {
        if (parent.id === parentId) {
          return {
            ...parent,
            topic: selectedChild.topic, // 부모 항목의 제목을 선택된 항목으로 변경하기 !!
          };
        }
        return parent;
      });
      return updatedList;
    });
  };

  




  useEffect(() => {

  }, []);



  return (
    <div className='galpi-setting-container'>
      <form onSubmit={handleSubmit}>
        <div className='galpi-title'>갈피 설정/관리</div>

        <div className='galpi-menu'>
          <div className='galpi-list'>
            <div>갈피 목록</div>
            <div>
              <AccordionList items={galpilist} onChildClick={handleChildClick} />
            </div>
          </div>
        </div>

        <div className='galpi-menu'>
          <div>갈피 관리자</div>
          <div><PeopleSlide mode={2} data={galpimanange} /></div>
        </div>

        <div className='galpi-menu'>
          <div>공동 작업 가능 여부</div>
          <div>
            <div className='collaborate-radio-item'>
              <input
                type="radio"
                id="collaborate-possible"
                name="collaborate"
                value="가능"
                checked={collaborate === "가능"}
                onChange={handleCollaborateChange}
              />
              <label htmlFor='collaborate-possible'>가능</label>
            </div>
            <div className='collaborate-radio-item'>
              <input
                type="radio"
                id="collaborate-impossible"
                name="collaborate"
                value="불가능"
                checked={collaborate === "불가능"}
                onChange={handleCollaborateChange}
              />
              <label htmlFor='collaborate-impossible'>불가능</label>
            </div>
          </div>
        </div>

        <div className='galpi-menu'>
          <div>동시 작업 가능 여부</div>
          <div>
            <div className='concurrentWork-radio-item'>
              <input
                type="radio"
                id="concurrentWork-possible"
                name="concurrentWork"
                value="가능"
                checked={concurrentWork === "가능"}
                onChange={handleConcurrentWorkChange}
              />
              <label htmlFor='concurrentWork-possible'>가능</label>
            </div>
            <div className='concurrentWork-radio-item'>
              <input
                type="radio"
                id="concurrentWork-impossible"
                name="concurrentWork"
                value="불가능"
                checked={concurrentWork === "불가능"}
                onChange={handleConcurrentWorkChange}
              />
              <label htmlFor='concurrentWork-impossible'>불가능</label>
            </div>
          </div>
        </div>

        <button type="submit">저장하기</button>
      </form>
    </div>
  )
}
