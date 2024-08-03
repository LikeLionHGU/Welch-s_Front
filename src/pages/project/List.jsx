// 프로젝트 전체 페이지
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import "../../styles/list.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import { useLocation } from "react-router-dom";

const ProjectList = ({ project = [] }) => {
  if (!project || project.length === 0) {
    return null;
  }

  return (
    <div>
      {project.map((item, index) => (
        <div key={index} className="list-card">
        <div
          className="list-img"
          style={{ backgroundImage: `url(${item.imageAddress})` }}
        >
          <div className="list-img-inner">
            <div>{item.category}</div>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
};

export default function List() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdown, setDropdown] = useState("");
  const { category, bigCategory, status } = location.state || {}; // id는 모집중, 완결, 연재중 여부
  const [projectList, setProjectList] = useState = ([]);



  const [isFinished, setIsFinished] = useState(false);
  const [isRecruit, setIsRecruit] = useState(false);

  const handleSelectChange = (event) => {
    setDropdown(event.target.value);
  };

  const checkStatus = () => {
    if(status === "모집 중") {
      setIsRecruit(true);
    } else if(status === "연재 중") {
      setIsFinished(false);
    } else { // 완결
      setIsFinished(true);
    }
  };


  const fetchProjectWithCategoryAndFinish = () => { // 대분류 사용하지 않고 검색
    const token = localStorage.getItem("token");

      if (token == null) {
        navigate("/", { replace: true });
        return;
      }


    axios
      .get(`https://likelion.info/project/get/category/${category}/${isFinished}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setProjectList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      });
  };

  const fetchProjectWithCategoryAndRecruit = () => { // 대분류 사용하지 않고 검색
    const token = localStorage.getItem("token");

      if (token == null) {
        navigate("/", { replace: true });
        return;
      }


    axios
      .get(`https://likelion.info/project/get/category/${category}/${isRecruit}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setProjectList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      });
  };

  const fetchProjectWithBigCategoryAndFinish = () => { // 대분류를 사용하여 검색
    const token = localStorage.getItem("token");

      if (token == null) {
        navigate("/", { replace: true });
        return;
      }
    axios
      .get(`https://likelion.info/project/get/${bigCategory}/${isFinished}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setProjectList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      });
  };

  const fetchProjectWithBigCategoryAndRecruit = () => { // 대분류를 사용하여 검색
    const token = localStorage.getItem("token");

      if (token == null) {
        navigate("/", { replace: true });
        return;
      }
    axios
      .get(`https://likelion.info/project/get/${bigCategory}/${isRecruit}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setProjectList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      });
  };

  useEffect(() => {
    checkStatus(); // status 먼저 확인해야함

    if(isRecruit) { // 모집 중
      if(category === null) { // 대분류 모집
        fetchProjectWithBigCategoryAndRecruit(); // 대분류 + 모집중
      } else { // 소분류 모집
        fetchProjectWithCategoryAndRecruit(); // 소분류 + 모집중
      }
    } else {
      if(category === null) { // 대분류 모집
        fetchProjectWithBigCategoryAndFinish(); // 대분류 + 완결 and 대분류 + 연재중
      } else { // 소분류 모집
        fetchProjectWithCategoryAndFinish(); // 소분류 + 완결 and 소분류 + 연재중
      }
    }
  }, []);





  return (
    <div className="main-list-container">
      <Header mode={1} />
      <div className="list-grid-container">
        <div className="list-dropdown-container">
          <select value={dropdown} onChange={handleSelectChange}>
            <option value="option1">모집 중</option>
            <option value="option2">완결</option>
            <option value="option3">연재 중</option>
          </select>
        </div>
        <div className="list-container">
          <ProjectList />
        </div>
      </div>
    </div>
  );
}
