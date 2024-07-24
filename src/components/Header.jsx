import LogoImg from "../imgs/logo.svg";
import SearchImg from "../imgs/search.svg";
import ProfileImg from "../imgs/myprofile.svg";
import "../styles/header.css";
import { useState } from "react";

export default function Header() {
  const [selectedCategory, setSelectedCategory] = useState("소설");

  const categories = {
    소설: ["공포", "로맨스", "미스터리/추리", "역사", "판타지", "SF"],
    시: ["감정", "사회", "자연", "철학"],
    에세이: ["개인경험", "사회", "여행", "자기개발"],
    비문학: ["과학", "자기개발", "전기", "역사"],
    드라마: ["가족", "모험", "사회", "정치"],
    기타: ["기타"],
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div>
      <div className="headerContainer">
        <div>
          <img src={LogoImg} alt="logo" />
        </div>
        <div className="searchContainer">
          <input className="searchBox" placeholder="책 제목, 작가명" />
          <img src={SearchImg} alt="search" />
        </div>
        <div className="headerRight">
          <button id="goWrite">책 발간하기</button>
          <div>
            <img className="profile" src={ProfileImg} alt="profile" />
          </div>
        </div>
      </div>
      <div className="categoryContainer">
        <div className="category">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="category">
          {categories[selectedCategory].map((option, index) => (
            <button key={index}>{option}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
