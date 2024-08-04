import { useState, useEffect } from "react";
import Header from "../../components/Header";
import "../../styles/list.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { categoryState, bigCategoryState } from "../../atom";

export default function List() {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState("option1");
  // const { category, bigCategory } = location.state || {};
  const [projectList, setProjectList] = useState([]);
  const [category, setCategory] = useRecoilState(categoryState);
  const [bigCategory, setbigCategory] = useRecoilState(bigCategoryState);

  const handleSelectChange = (event) => {
    setDropdown(event.target.value);
  };

  const handleListClick = (id) => {
    navigate("/detail", { state: { id } });
  };

  const ProjectList = ({ project = [] }) => {
    if (!project || project.length === 0) {
      return <p>No projects found</p>;
    }

    return (
      <div className="list-container">
        {project.map((item, index) => (
          <div key={index} className="list-card">
            <div
              className="list-img"
              style={{ backgroundImage: `url(${item.imageAddress})` }}
              onClick={() => {
                handleListClick(item.id);
              }}
            >
              <div className="list-img-inner">
                <div
                  className="list-img-inner-contents"
                  id="list-img-inner-name"
                >
                  {item.name}
                </div>
                <div
                  className="list-img-inner-contents"
                  id="list-img-inner-owner"
                >
                  {item.ownerName}
                </div>
                <div
                  className="list-img-inner-contents"
                  id="list-img-inner-category"
                >
                  {item.category}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const fetchProjects = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    let endpoint = "";
    let isFinished = false;
    let isRecruit = false;

    switch (dropdown) {
      case "option1": // 모집 중
        isRecruit = true;
        break;
      case "option2": // 완결
        isFinished = true;
        break;
      case "option3": // 연재 중
        isFinished = false;
        break;
      default:
        break;
    }

    if (isRecruit) {
      // 모집 중
      if (category === "전체") {
        // 대분류 모집
        endpoint = `https://likelion.info/project/get/category/big/recruit/${bigCategory}/${isRecruit}`; // 대분류 + 모집중
      } else {
        // 소분류 모지
        endpoint = `https://likelion.info/project/get/category/recruit/${category}/${isRecruit}`; // 소분류 + 모집중
      }
    } else {
      if (category === "전체") {
        // 대분류 모집
        endpoint = `https://likelion.info/project/get/category/big/finish/${bigCategory}/${isFinished}`; // 대분류 + 완결 and 대분류 + 연재중
      } else {
        // 소분류 모집
        endpoint = `https://likelion.info/project/get/category/finish/${category}/${isFinished}`; // 소분류 + 완결 and 소분류 + 연재중
      }
    }

    axios
      .get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setProjectList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        localStorage.removeItem("token");
        // navigate("/", { replace: true });
      });
  };

  useEffect(() => {
    fetchProjects();
    console.log(category, bigCategory);
  }, [dropdown, category, bigCategory]);

  useEffect(() => {
    console.log(projectList);
  }, [projectList]);

  return (
    <div className="main-list-container">
      <Header mode={1} />
      <div className="list-grid-container">
        <div className="list-dropdown-container">
          <select
            value={dropdown}
            onChange={handleSelectChange}
            className="list-dropdown-selector"
          >
            <option className="list-dropdown-option" value="option1">
              모집 중
            </option>
            <option className="list-dropdown-option" value="option2">
              완결
            </option>
            <option value="option3">연재 중</option>
          </select>
        </div>
        <ProjectList project={projectList} />
      </div>
    </div>
  );
}
