// 상대방 프로필 보이는 페이지
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import EditImg from "../imgs/edit.svg";
import ImgNone from "../imgs/img_none.svg";
import Header from "../components/Header";
import Slide from "../components/Slide";
import axios from "axios";

import "../styles/profile.scss";

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  console.log(id);
  
  const [wallpaper, setWallPaper] = useState(`${ImgNone}`);
  const [profile, setProFile] = useState(`${ImgNone}`);
  const [userInfo, setUserInfo] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {

    const token = localStorage.getItem("token");
    

    try {
      const response = await axios.post(
        `https://likelion.info/subscribe/switch/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
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

    setIsSubscribed(!isSubscribed);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token == null) {
      navigate("/", { replace: true });
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`https://likelion.info/user/info/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        console.log(response.data);
        setUserInfo(response.data);
        setWallPaper(response.data.backImage || `${ImgNone}`);
        setProFile(response.data.profileImage || `${ImgNone}`);
        setIsSubscribed(response.data.isSubscribe);
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
              <div className="profile-name">{userInfo.name}</div>
              <div className="profile-oneliner">{userInfo.information}</div>
              <div className="profile-email-title">이메일</div>
              <div className="profile-email">{userInfo.email}</div>
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
                <div className="books-num">{userInfo.progressProjects}</div>
                <div className="books-count-title">권</div>
              </div>
            </div>
            <div className="books-completed-count">
              <div className="books-count-title">완결된 책</div>
              <div className="books-count-set">
                <div className="books-num">{userInfo.finishedProjects}</div>
                <div className="books-count-title">권</div>
              </div>
            </div>
            <div className="books-subscribe-count">
              <div className="books-count-title">구독자</div>
              <div className="books-count-set">
                <div className="books-num">{userInfo.subscribeUserCounts}</div>
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
            <Slide mode={3} data={userInfo.progressProjectList || []} />
          </div>
        </div>
      </div>

    </div>








  )

}
