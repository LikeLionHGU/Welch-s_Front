// 자신의 프로필이 보이는 페이지
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WallPaperUpLoad from "../components/WallPaperUpLoad";
import ProfileUpload from "../components/ProfileUpLoad";
import EditImg from "../imgs/edit.svg";
import ImgNone from "../imgs/img_none.svg";
import Header from "../components/Header";
import Slide from "../components/Slide";
import axios from 'axios';

import "../styles/mypageedit.scss";

export default function MypageEdit() {
    const navigate = useNavigate();
    const [wallpaper, setWallPaper] = useState();
    const [profile, setProFile] = useState();
    const [userInfo, setUserInfo] = useState([]);
    

    const handleWallPaperUpload = (file) => {
        setWallPaper(file);
    };


    const handleProFileUpload = (file) => {
        
        setProFile(file);
    };

    

    const handleSave = async () => {
        // event.preventDefault();
        const token = localStorage.getItem('token');

        const value = {
            name: userInfo.name,
            information: userInfo.userOneliner,
            email: userInfo.email
        }

        const formData = new FormData();
        formData.append("back", wallpaper);
        formData.append("profile", profile);
        formData.append(
        "post",
        new Blob([JSON.stringify(value)], {
            type: "application/json",
        })
        );



        try {
            const response = await axios.patch(
              "https://likelion.info/user/update",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
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
    };

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
        <div className="my-page-edit">
            <Header mode={3} />
            <div className="my-page-edit-container">
                <div className="edit-wall-paper-section">
                    <WallPaperUpLoad onWallPaperUpload={handleWallPaperUpload} initialImage={wallpaper} />
                    <div className="edit-overlay-content">
                        <h1>나의 프로필</h1>
                        <div className="edit-profile-section">
                            <ProfileUpload onProFileUpload={handleProFileUpload} initialImage={profile}/>
                        </div>
                    </div>
                </div>

                <div className="edit-profile-details">
                    <div className="edit-profile-details-exp">
                        <div className="profile-details-save">
                            <input
                                type="text"
                                value={userInfo.name}
                                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                            />
                            <button>
                                <div>
                                    <img
                                        className="profile-save"
                                        src={EditImg}
                                        alt="profile"
                                        onClick={handleSave}
                                    />
                                </div>
                            </button>
                        </div>
                        <input
                            type="text"
                            value={userInfo.userOneliner}
                            onChange={(e) => setUserInfo({ ...userInfo, userOneliner: e.target.value })}
                        />
                        <div>이메일</div>
                        <input
                            type="text"
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        />
                    </div>
                    <div className="edit-profile-details-count">
                        <div className="edit-books-progress-count">
                            <div>진행 중인 책</div>
                            <div>{userInfo.progressProjects}권</div>
                        </div>
                        <div className="edit-books-completed-count">
                            <div>완결된 책</div>
                            <div>{userInfo.finishedProjects}권</div>
                        </div>
                        <div className="edit-books-subscribe-count">
                            <div>구독자</div>
                            <div>{userInfo.subscribeUserCounts}명</div>
                        </div>
                    </div>
                </div>

                <div className="edit-my-book-lists">
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
