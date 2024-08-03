// 자신의 프로필이 보이는 페이지
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WallPaperUpLoad from "../components/WallPaperUpLoad";
import ProfileUpload from "../components/ProfileUpLoad";
import EditImg from "../imgs/edit.svg";
import ImgNone from "../imgs/img_none.svg";
import Header from "../components/Header";
import Slide from "../components/Slide";
import axios from "axios";

import "../styles/mypage.scss";

export default function Mypage() {
  const navigate = useNavigate();
  const [wallpaper, setWallPaper] = useState(`${ImgNone}`);
  const [profile, setProFile] = useState(`${ImgNone}`);
  const [userInfo, setUserInfo] = useState([]);
  //const [bookData, setBookData] = useState({ progress: [], completed: [], favorite: [] });

  

  const handleWallPaperUpload = (file) => {
    setWallPaper(file);
  };

  const handleProFileUpload = (file) => {
    setProFile(file);
  };

  function toEdit() {
    navigate("/mypage/edit");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token == null) {
      navigate("/", { replace: true });
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("https://likelion.info/user/info", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUserInfo(response.data);
        setWallPaper(response.data.backImage || `${ImgNone}`);
        setProFile(response.data.profileImage || `${ImgNone}`);
        // setBookData({
        //   progress: response.data.progressBooks || [],
        //   completed: response.data.completedBooks || [],
        //   favorite: response.data.favoriteBooks || [],
        // });
      } catch (error) {
        console.error('Error fetching user info:', error);
        localStorage.removeItem("token");
        navigate('/', { replace: true });
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div className="my-page">
      <Header mode={3} />
      <div className="my-page-container">
        <div className="wall-paper-section">
          <img className="wall-pape-cover" src={wallpaper} alt="img" />
          <div className="overlay-content">
            <h1>나의 프로필</h1>
            <div className="my-page-profile-section">
              <img className="my-page-profile-cover" src={profile} alt="img" />
            </div>
          </div>
        </div>

        <div className="my-page-profile-details">
          <div className="my-page-profile-details-exp">
            <div className="my-page-profile-details-edit">
              <div>{userInfo.name}</div>
              <button>
                <div>
                  <img
                    className="my-page-profile-edit"
                    src={EditImg}
                    alt="profile/edit"
                    onClick={() => {
                      toEdit();
                    }}
                  />
                </div>
              </button>
            </div>
            <div>{userInfo.information}</div>
            <div>이메일</div>
            <div>{userInfo.email}</div>
          </div>
          <div className="my-page-profile-details-count">
            <div className="my-page-books-progress-count">
              <div>진행 중인 책</div>
              <div>{userInfo.progressProjects}권</div>
            </div>
            <div className="my-page-books-completed-count">
              <div>완결된 책</div>
              <div>{userInfo.finishedProjects}권</div>
            </div>
            <div className="my-page-books-subscribe-count">
              <div>구독자</div>
              <div>{userInfo.subscribeUserCounts}명</div>
            </div>
          </div>
        </div>

        <div className="my-book-lists">
          <div className="books-progress">
            <h3>진행 중인 책</h3>
            <Slide mode={2} data={userInfo.progressProjectList || []} />
          </div>
          <div className="books-completed">
            <h3>완결된 책</h3>
            <Slide mode={2} data={userInfo.finishedProjectList || []} />
          </div>
          <div className="books-favorite">
            <h3>좋아하는 책</h3>
            <Slide mode={2} data={userInfo.likedProjectList || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
