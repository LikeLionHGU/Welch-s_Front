import Header from "../components/Header";
import Slide from "../components/Slide";
import { useNavigate } from "react-router-dom";
import "../styles/mainpage.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Mainpage() {
  const navigate = useNavigate();
  const [bestProjects, setBestProjects] = useState([]);
  const [projects, setProjects] = useState([]);

  function toList() {
    navigate("/list");
  }


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token == null) {
      navigate("/", { replace: true });
      return;
    }

    const fetchBestProjects = () => {
      axios
        .get("https://likelion.info/project/get/best", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setBestProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          navigate("/", { replace: true });
        });
    };

    const fetchAllProjects = () => {
      axios
        .get("https://likelion.info/project/get/all", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          navigate("/", { replace: true });
        });
    };

    fetchAllProjects();
    fetchBestProjects();
  }, []);

  // useEffect(() => {
  //   console.log(bestProjects);
  // }, [bestProjects]);

  // useEffect(() => {
  //   console.log(
  //     projects.filter((project) => project.isRecruit && project.isPublic)
  //   );
  // }, [projects]);

  return (
    <div className="main-page">
      <Header mode={0} />
      <div className="main-page-container">
        <div className="main-section" id="best-book">
          <div className="main-section-above" id="best-above">
            베스트 책
          </div>
          <div className="main-slide-container">
            <Slide mode={1} data={bestProjects} />
          </div>
        </div>
        <div className="main-section">
          <div className="main-section-above">
            <div>함께 책 만들 작가 모집</div>
            <div
              onClick={() => {
                toList();
              }}
            >
              더보기
            </div>
          </div>
          <div className="main-slide-container">
            <Slide
              mode={0}
              data={projects.filter(
                (project) => project.isRecruit && project.isPublic
              )}
            />
          </div>
        </div>
        <div className="main-section">
          <div className="main-section-above">
            <div>완결된 책</div>
            <div
              onClick={() => {
                toList();
              }}
            >
              더보기
            </div>
          </div>
          <div className="main-slide-container">
            <Slide
              mode={0}
              data={projects.filter(
                (project) => project.isFinished && project.isPublic
              )}
            />
          </div>
        </div>
        <div className="main-section">
          <div className="main-section-above">
            <div>진행 중인 책</div>
            <div
              onClick={() => {
                toList();
              }}
            >
              더보기
            </div>
          </div>
          <div className="main-slide-container">
            <Slide
              mode={0}
              data={projects.filter((project) => !project.isFinished)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
