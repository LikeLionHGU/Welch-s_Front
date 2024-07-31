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
    const [wallpaper, setWallPaper] = useState(`${ImgNone}`);
    const [profile, setProFile] = useState(`${ImgNone}`);
    const [userInfo, setUserInfo] = useState([]);
    const [bookData, setBookData] = useState({ progress: [], completed: [], favorite: [] });

    const handleWallPaperUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setWallPaper(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleProFileUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProFile(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('https://likelion.info/user/update', {
                //wallpaper,
                //profile,
                name: userInfo.name,
                userOneliner: userInfo.userOneliner,
                email: userInfo.email,
            }, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            // 이미지와 사용자 정보를 업데이트 후 MyPage로 이동
            navigate("/mypage");
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token == null) {
            navigate('/', { replace: true });
            return;
        }

        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('https://likelion.info/user/info', {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                setUserInfo(response.data);
                setWallPaper(response.data.wallpaper || `${ImgNone}`);
                setProFile(response.data.profile || `${ImgNone}`);
                setBookData({
                    progress: response.data.progressBooks || [],
                    completed: response.data.completedBooks || [],
                    favorite: response.data.favoriteBooks || [],
                });
            } catch (error) {
                console.error('Error fetching user info:', error);
                navigate('/', { replace: true });
            }
        };

        fetchUserInfo();
    }, [navigate]);

    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);

    return (
        <div className="my-page-edit">
            <Header mode={3} />
            <div className="my-page-edit-container">
                <div className="edit-wall-paper-section">
                    <WallPaperUpLoad onWallPaperUpload={handleWallPaperUpload} />
                    <div className="edit-overlay-content">
                        <h1>나의 프로필</h1>
                        <div className="edit-profile-section">
                            <ProfileUpload onProFileUpload={handleProFileUpload} />
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
                    <div className="edit-books-progress">
                        <h3>진행 중인 책</h3>
                        <Slide mode={2} data={bookData.progress} />
                    </div>
                    <div className="edit-books-completed">
                        <h3>완결된 책</h3>
                        <Slide mode={2} data={bookData.completed} />
                    </div>
                    <div className="edit-books-favorite">
                        <h3>좋아하는 책</h3>
                        <Slide mode={2} data={bookData.favorite} />
                    </div>
                </div>
            </div>
        </div>
    );
}
