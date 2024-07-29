import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import wallpaper from "../imgs/WallPaper.svg";
import ProfileImg from "../imgs/profile.svg";
import BooksList from "../components/BooksList";
import BookImage from "../imgs/test1.png";
import axios from "axios";
import "../styles/mypage.scss"; // 스타일링을 위한 CSS 파일

export default function MyPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    userName: "낱말",
    userOneliner: "아름답고 쓸모없기를",
    userEmail: "sseuim@gmail.com",
    userProfileImage: ProfileImg,
    userSpicyLevel: null,
    booksInProgress: [
      { title: "진실이 말소된 페이지" },
      { title: "한국사 잘하는 법", image: BookImage },
      { title: "한국사 잘하는 법", image: BookImage },
      { title: "한국사 잘하는 법", image: BookImage },
      { title: "한국사 잘하는 법", image: BookImage },
      { title: "한국사 잘하는 법", image: BookImage },
      { title: "한국사 잘하는 법", image: BookImage },
      { title: "한국사 잘하는 법", image: BookImage },
      { title: "한국사 잘하는 법", image: BookImage },
      { title: "한국사 잘하는 법", image: BookImage },
      { title: "한국사 잘하는 법", image: BookImage },
      
    ],
    completedBooks: [
      { title: "진실이 말소된 페이지", image: BookImage },
      { title: "한국사 잘하는 법", image: BookImage },
    ],
    favoriteBooks: [
      { title: "진실이 말소된 페이지", image: BookImage },
      { title: "한국사 잘하는 법", image: BookImage },
    ],
    subscribedAuthors: [{ name: "작가1" }, { name: "작가2" }],
    subscribersCount: 21,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/mypage/memberInfo", {
          withCredentials: true,
        });
        setUserInfo((prevState) => ({
          ...prevState,
          userName: response.data.userName,
          userEmail: response.data.userEmail,
          userSpicyLevel: response.data.userSpicyLevel,
        }));
      } catch (error) {
        console.error("Error occurred while fetching:", error);
        setError("서버 에러");
      }
    };

    fetchMemberInfo();
  }, []);

  useEffect(() => {
    const fetchReviewList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/mypage/reviewlist", {
          withCredentials: true,
        });
        setUserInfo((prevState) => ({
          ...prevState,
          booksInProgress: response.data.booksInProgress,
          completedBooks: response.data.completedBooks,
          favoriteBooks: response.data.favoriteBooks,
          subscribedAuthors: response.data.subscribedAuthors,
        }));
      } catch (error) {
        console.error("Error occurred while fetching:", error);
      }
    };

    fetchReviewList();
  }, []);

  return (
    <>
      <Header mode={3} />
      <div className="mypage-container">
        <div className="wallpaper-container">
          <img src={wallpaper} alt="Wallpaper" className="wallpaper-image" />
        </div>

        <h2>나의 프로필</h2>
        <div className="profile-section">
          <img src={userInfo.userProfileImage} alt="Profile" />
          <div className="profile-details">
            <h1>{userInfo.userName}</h1>
            <p>{userInfo.userOneliner}</p>
            <p>이메일</p>
            <p>{userInfo.userEmail}</p>
          </div>


          <div className="profile-stats">
            <div>
              <h3>진행 중인 책</h3>
              <p>{userInfo.booksInProgress.length} 권</p>
            </div>
            <div>
              <h3>완결된 책</h3>
              <p>{userInfo.completedBooks.length} 권</p>
            </div>
            <div>
              <h3>구독자</h3>
              <p>{userInfo.subscribersCount} 명</p>
            </div>
          </div>
        </div>

        <div className="books-section">
          <h2>진행 중인 책</h2>
          <BooksList books={userInfo.booksInProgress} />

          <h2>완결된 책</h2>
          <BooksList books={userInfo.completedBooks} />

          <h2>좋아하는 책</h2>
          <BooksList books={userInfo.favoriteBooks} />

          <h2>구독한 작가</h2>
          <div className="authors-list">
            {userInfo.subscribedAuthors.map((author, index) => (
              <div key={index} className="author-card">
                {author.name}
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </>
  );
}
