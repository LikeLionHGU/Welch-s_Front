// 상대방 프로필 보이는 페이지
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EditImg from "../imgs/edit.svg";
import ImgNone from "../imgs/img_none.svg";
import Header from "../components/Header";
import Slide from "../components/Slide";
import axios from "axios";

import "../styles/profile.scss";

export default function Profile() {
  const navigate = useNavigate();
  const [wallpaper, setWallPaper] = useState(`${ImgNone}`);
  const [profile, setProFile] = useState(`${ImgNone}`);
  const [userInfo, setUserInfo] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="profile-page">
      <Header mode={3} />
      <div className="profile-container">
        <div className="profile-wall-paper-section">
          <img className="profile-wall-pape-cover" src={wallpaper} alt="img" />
        </div>
        <div className="profile-overlay-content">
          <div className="profile-img-section">
            <img className="profile-img-cover" src={profile} alt="img" />
          </div>

        </div>


        <div className="profile-details">
          <div className="profile-details-edit">
            <div className="profile-details-exp">
              <div>{userInfo.name}</div>
              <div>{userInfo.userOneliner}</div>
              <div>이메일</div>
              <div>{userInfo.email}</div>
            </div>
            <div>
              <button onClick={handleSubscribe}>
                {isSubscribed ? '구독중' : '구독하기'}
              </button>
            </div>
          </div>
          
          <div className="profile-details-count">
            <div className="books-progress-count">
              <div>진행 중인 책</div>
              <div>{userInfo.progressProjects}권</div>
            </div>
            <div className="books-completed-count">
              <div>완결된 책</div>
              <div>{userInfo.finishedProjects}권</div>
            </div>
            <div className="books-subscribe-count">
              <div>구독자</div>
              <div>{userInfo.subscribeUserCounts}명</div>
            </div>
          </div>
        </div>

        <div className="profile-book-lists">
          <div className="profile-book-projects">
            <div>
              프로젝트
            </div>
            <Slide mode={2} data={userInfo.progressProjectList || []} />
          </div>
        </div>
      </div>

    </div>








  )

}
