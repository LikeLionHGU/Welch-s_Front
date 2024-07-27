// 프로젝트 전체 페이지
import { useState } from "react";
import Header from "../../components/Header";
import "../../styles/list.css";

import Test1 from "../../imgs/test1.png";
import Test2 from "../../imgs/test2.png";
import Test3 from "../../imgs/test3.png";
import Test4 from "../../imgs/test4.png";

const imageData = [
  {
    id: 1,
    title: "Image 1",
    src: Test1, // 여기에 실제 이미지 경로를 입력하세요
  },
  {
    id: 2,
    title: "Image 2",
    src: Test2, // 여기에 실제 이미지 경로를 입력하세요
  },
  {
    id: 3,
    title: "Image 3",
    src: Test3, // 여기에 실제 이미지 경로를 입력하세요
  },
  {
    id: 4,
    title: "Image 4",
    src: Test4, // 여기에 실제 이미지 경로를 입력하세요
  },
  // 필요한 만큼 추가
];

export default function List() {
  const [dropdown, setDropdown] = useState("");

  const handleSelectChange = (event) => {
    setDropdown(event.target.value);
  };
  return (
    <>
      <Header mode={1} />
      <select value={dropdown} onChange={handleSelectChange}>
        <option value="option1">모집 중</option>
        <option value="option2">완결</option>
        <option value="option3">연재중</option>
      </select>
      <div className="list-container">
        {imageData.map((image) => (
          <div key={image.id} className="list-card">
            <div
              className="list-img"
              style={{ backgroundImage: `url(${image.src})` }}
            />
            {/* <img src={image.src} alt={image.title} className="list-img" /> */}
            <h2>{image.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
