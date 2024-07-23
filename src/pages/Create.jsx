// 프로젝트 생성 페이지
import { useState } from "react";
import "../styles/create.css";

const categories = {
  소설: ["공포", "로맨스", "미스터리/추리", "역사", "판타지", "SF"],
  시: ["감정", "사회", "자연", "철학"],
  에세이: ["개인경험", "사회", "여행", "자기계발"],
  비문학: ["과학", "자기계발", "전기", "역사"],
  드라마: ["가족", "교훈", "사회", "정치"],
  기타: ["기타"],
};
export default function Create() {
  const [selectedCategories, setSelectedCategories] = useState({});
  const [visibility, setVisibility] = useState("공개");

  const handleCategoryChange = (category, item) => {
    setSelectedCategories((prevSelectedCategories) => {
      const updatedCategories = {
        ...prevSelectedCategories,
        [category]: item, // 각 카테고리에 대해 선택된 항목만 저장
      };
      console.log(updatedCategories);
      return updatedCategories;
    });
  };

  const handleVisibilityChange = (event) => {
    const newVisibility = event.target.value;
    setVisibility(newVisibility);
    console.log(newVisibility);
  };
  return (
    <>
      <div>책 발간</div>
      <div>책 제목 *</div>
      <input placeholder="책 제목을 입력해 주세요."></input>
      <div>책 표지 이미지</div>
      <input type="file" />
      <div>책 장르 *</div>
      <div className="categoryContainer">
        {Object.keys(categories).map((category) => (
          <div key={category} className="category">
            <h3>{category}</h3>
            {categories[category].map((item) => (
              <div key={item} className="radio-item">
                <input
                  type="radio"
                  id={item}
                  name={category}
                  onChange={() => handleCategoryChange(category, item)}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>책 소개 *</div>
      <input placeholder="책 소개를 입력해 주세요."></input>
      <div>책 공개 여부</div>
      <div className="radio-item">
        <input
          type="radio"
          id="public"
          name="visibility"
          value="공개"
          checked={visibility === "공개"}
          onChange={handleVisibilityChange}
        />
        <label htmlFor="public">공개</label>
      </div>
      <div className="radio-item">
        <input
          type="radio"
          id="private"
          name="visibility"
          value="비공개"
          checked={visibility === "비공개"}
          onChange={handleVisibilityChange}
        />
        <label htmlFor="private">비공개</label>
      </div>
    </>
  );
}

// 카테고리 최대 개수?
