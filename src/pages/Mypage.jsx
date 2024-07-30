// 자신의 프로필이 보이는 페이지
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WallPaperUpLoad from "../components/WallPaperUpLoad";
import ProfileUpload from "../components/ProfileUpLoad";
import ImgNone from "../imgs/img_none.svg";
import Header from "../components/Header"
import Slide from "../components/Slide";
import axios from 'axios';

import "../styles/WallPaperUpLoad.scss"




export default function Mypage() {
    const navigate = useNavigate();
    const [wallpaper, setWallPaper] = useState(`${ImgNone}`);
    const [profile, setProFile] = useState(`${ImgNone}`);
    const [userInfo, setUserInfo] = useState([]);

    const handleWallPaperUpload = (file) => {
      setWallPaper(file);
    };
    const handleProFileUpload = (file) => {
      setProFile(file);
    };

    useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (token == null) {
        navigate('/', { replace: true });
        return;
      }
  
      const fetchUserInfo = () => {
        axios.get('https://likelion.info/user/info', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        })
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
          navigate('/', { replace: true });
        });
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

          {/* <div className="wallpaper-container">
            <img src={wallpaper} alt="Wallpaper" className="wallpaper-image" />
          </div> */}

          나의 프로필 

          <div className="wall-paper-section">
            <WallPaperUpLoad onWallPaperUpload={handleWallPaperUpload} />
          </div>

          <div className="my-profile-section">
            <ProfileUpload onProFileUpload={handleProFileUpload}/>
            <div className="profile-details">

            </div>
          </div>

          <div className="my-book-lists">
            <div className="books-progress">
              <div>진행 중인 책</div>
              <Slide mode={2}/>
            </div>
            <div className="books-completed">
              <div>완결된 책</div>
              <Slide mode={2}/>
            </div>
            <div className="books-favorite ">
              <div>좋아하는 책</div>
              <Slide mode={2}/>
            </div>
          </div>


        </div>
      </div>

    )
  }
  