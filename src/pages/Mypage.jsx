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
        </div>
        <div className="overlay-content">
          <h1 className="my-page-title">나의 프로필</h1>
          <div className="my-page-profile-section">
            <img className="my-page-profile-cover" src={profile} alt="img" />
          </div>
        </div>

        <div className="my-page-profile-details">
          <div className="my-page-profile-details-edit">
            <div className="my-page-profile-details-exp">
              <div className="my-page-name">{userInfo.name}</div>
              <div className="my-page-oneliner">{userInfo.userOneliner}</div>
              <div className="my-page-email-title">이메일</div>
              <div className="my-page-email">{userInfo.email}</div>
            </div>
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
          </div>
          <div className="my-page-profile-details-count">
            <div className="my-page-books-progress-count">
              <div className="book-count-title">진행 중인 책</div>
              <div className="book-count-set">
                <div className="book-num">{userInfo.progressProjects}</div>
                <div className="book-count-title">권</div>
              </div>
            </div>
            <div className="my-page-books-completed-count">
              <div className="book-count-title">완결된 책</div>
              <div className="book-count-set">
                <div className="book-num">{userInfo.finishedProjects}</div>
                <div className="book-count-title">권</div>
              </div>
            </div>
            <div className="my-page-books-subscribe-count">
              <div className="book-count-title">구독자</div>
              <div className="book-count-set">
                <div className="book-num">{userInfo.subscribeUserCounts}</div>
                <div className="book-count-title">명</div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-book-lists">
          <div className="books-progress">
            <h3 className="my-book-lists-title">진행 중인 책</h3>
            <Slide mode={2} data={userInfo.progressProjectList || []} />
          </div>
          <div className="books-completed">
            <h3 className="my-book-lists-title">완결된 책</h3>
            <Slide mode={2} data={userInfo.finishedProjectList || []} />
          </div>
          <div className="books-favorite">
            <h3 className="my-book-lists-title">좋아하는 책</h3>
            <Slide mode={2} data={userInfo.likedProjectList || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
