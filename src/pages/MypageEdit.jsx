// 자신의 프로필이 보이는 페이지
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WallPaperUpLoad from "../components/WallPaperUpLoad";
import ProfileUpload from "../components/ProfileUpLoad";
import SaveImg from "../imgs/save.svg";
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
    const [profileSrc, setProfileSrc] = useState();
    const [backSrc, setBackSrc] = useState();
    


    const handleWallPaperUpload = (file) => {
        setWallPaper(file);
        setBackSrc(URL.createObjectURL(file));
    };


    const handleProFileUpload = (file) => {
        setProFile(file); 
        setProfileSrc(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        // event.preventDefault();
        const token = localStorage.getItem('token');

        const value = {
            name: userInfo.name,
            information: userInfo.information,
            email: userInfo.email
        }

        const formData = new FormData();
        
        formData.append("profile", profile);
        formData.append("back", wallpaper);
        formData.append(
            "post",
            new Blob([JSON.stringify(value)], {
                type: "application/json",
            })
        );

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }



        try {
            const response = await axios.post(
                "https://likelion.info/user/update",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // "Content-Type": "multipart/form-data",
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
            setWallPaper(response.data.backImage);
            setProFile(response.data.profileImage || `${ImgNone}`);
            
            
          } catch (error) {
            console.error('Error fetching user info:', error);
            localStorage.removeItem("token");
            navigate('/', { replace: true });
          }
        };

        fetchUserInfo();
    }, []);

    // useEffect(() => {
    //     console.log(userInfo);
    // }, [userInfo]);

    // useEffect(() => {
    //     console.log("Updated wallpaper:", wallpaper);
    // }, [wallpaper]);
    
    return (
        <div className="my-page-edit">
            <Header mode={3} />
            <div className="my-page-edit-container">
                <div className="edit-wall-paper-section">
                    <WallPaperUpLoad 
                        className="edit-wall-paper"
                        onWallPaperUpload={handleWallPaperUpload} 
                        initialImage={backSrc || wallpaper} 
                    />
                </div>
                <div className="edit-overlay-content">
                        <h1 className="edit-profile-title">나의 프로필</h1>
                        <div className="edit-profile-section">
                            <ProfileUpload onProFileUpload={handleProFileUpload} initialImage={profileSrc || profile} />
                        </div>
                </div>

                <div className="edit-profile-details">
                    <div className="profile-details-save">
                        <div className="edit-profile-details-exp">
                            <input
                                className="edit-profile-name"
                                type="text"
                                value={userInfo.name}
                                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                            />

                            <input
                                className="edit-profile-onliner"
                                type="text"
                                value={userInfo.information}
                                onChange={(e) => setUserInfo({ ...userInfo, information: e.target.value })}
                            />
                            <div className="edit-profile-email-title" >이메일</div>
                            <input
                                className="edit-profile-email"
                                type="text"
                                value={userInfo.email}
                                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <img
                                className="profile-save"
                                src={SaveImg}
                                alt="profile"
                                onClick={handleSave}
                            />
                        </div>

                    </div>


                    <div className="edit-profile-details-count">
                        <div className="edit-books-progress-count">
                            <div className="edit-book-count-title">진행 중인 책</div>
                            <div className="edit-book-count-set">
                                <div className="edit-book-num">{userInfo.progressProjects}</div>
                                <div className="edit-book-count-title">권</div>
                            </div>
                        </div>
                        <div className="edit-books-completed-count">
                            <div className="edit-book-count-title">완결된 책</div>
                            <div className="edit-book-count-set">
                                <div className="edit-book-num">{userInfo.finishedProjects}</div>
                                <div className="edit-book-count-title">권</div>
                            </div>
                        </div>
                        <div className="edit-books-subscribe-count">
                            <div className="edit-book-count-title">구독자</div>
                            <div className="edit-book-count-set">
                                <div className="edit-book-num">{userInfo.subscribeUserCounts}</div>
                                <div className="edit-book-count-title">명</div>
                            </div>
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
