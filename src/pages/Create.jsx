// 프로젝트 생성 페이지
import { useState } from "react";
import "../styles/create.css";
import ImgUpLoad from "../components/ImgUpLoad";
import ImgNone from "../imgs/img_none.svg";

const categories = {
  소설: ["공포", "로맨스", "미스터리/추리", "역사", "판타지", "SF"],
  시: ["감정", "사회", "자연", "철학"],
  에세이: ["개인경험", "사회", "여행", "자기개발"],
  비문학: ["과학", "자기개발", "전기", "역사"],
  드라마: ["가족", "모험", "사회", "정치"],
  기타: ["기타"],
};
export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState({});
  const [visibility, setVisibility] = useState("공개");
  const [people, setPeople] = useState(0);
  const [image, setImage] = useState(`${ImgNone}`);

  // 카테고리
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

  // 공개 여부
  const handleVisibilityChange = (event) => {
    const newVisibility = event.target.value;
    setVisibility(newVisibility);
    console.log(newVisibility);
  };

  // 인원 수
  const handlePeople = (upDown) => {
    if (upDown === 1) {
      setPeople(people + 1);
    } else if (upDown === -1) {
      if (people !== 1) {
        setPeople(people - 1);
      }
    }
    console.log(people);
  };

  const handleImageUpload = (file) => {
    setImage(file);
  };

  // form data
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("visibility", visibility);
    formData.append("people", people);
    formData.append("categories", selectedCategories);
    formData.append("image", image);

    // fetch 들어갈 곳

    console.log("FormData:", formData);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  return (
    <div className="createContainer">
      <form onSubmit={handleSubmit}>
        <div id="pageTitle">책 발간</div>
        <div className="menu">
          <div>책 제목 *</div>
          <input
            placeholder="책 제목을 입력해 주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="menu">
          <div>책 표지 이미지</div>
          <ImgUpLoad onImageUpload={handleImageUpload} />
        </div>
        <div className="menu">
          <div>책 장르 *</div>
          <div className="categoryContainer">
            {Object.keys(categories).map((category) => (
              <div key={category} className="category">
                <div>{category}</div>
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
        </div>
        <div className="menu">
          <div>책 소개 *</div>
          <input
            placeholder="책 소개를 입력해 주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div className="menu">
          <div>책 공개 여부</div>
          <div>
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
          </div>
        </div>
        <div className="menu">
          <div>작가 정원 *</div>
          <div className="peopleNum">
            <button onClick={() => handlePeople(-1)}>-</button>
            <div>{people}</div>
            <button onClick={() => handlePeople(+1)}>+</button>
          </div>
        </div>
        <button type="submit">발간하기</button>
      </form>
    </div>
  );
}

// 카테고리 최대 개수?
