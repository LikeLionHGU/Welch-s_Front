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
        <div>
      </div>

        <div className="profile-details">
          <div className="profile-details-edit">
            <div className="profile-details-exp">
              <div className="profile-name">정소망</div>
              <div className="profile-oneliner">정망입니다</div>
              <div className="profile-email-title">이메일</div>
              <div className="profile-email">22000669@handong.ac.kr</div>
            </div>
            <button onClick={handleSubscribe}
            className="subscribed-button"
            style={{
              backgroundColor: isSubscribed ? '#356B28' : '#5CA54B', // 구독중: 녹색, 구독하기: 파란색
              width: '7.2vw',
              color: 'white',
              padding: '10px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '30px',
            }}
          >
            {isSubscribed ? '구독중' : '구독하기'}
          </button>
          </div>

          <div className="profile-details-count">
            <div className="books-progress-count">
              <div className="books-count-title">진행 중인 책</div>
              <div className="books-count-set">
                <div className="books-num">5</div>
                <div className="books-count-title">권</div>
              </div>
            </div>
            <div className="books-completed-count">
              <div className="books-count-title">완결된 책</div>
              <div className="books-count-set">
                <div className="books-num">8</div>
                <div className="books-count-title">권</div>
              </div>
            </div>
            <div className="books-subscribe-count">
              <div className="books-count-title">구독자</div>
              <div className="books-count-set">
                <div className="books-num">21</div>
                <div className="books-count-title">명</div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-book-lists">
          <div className="profile-book-projects">
            <div className="profile-book-title">
              프로젝트
            </div>
            <Slide mode={2} data={userInfo.progressProjectList || []} />
          </div>
        </div>
      </div>

    </div>








  )

}
