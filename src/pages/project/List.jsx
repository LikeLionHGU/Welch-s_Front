// 프로젝트 전체 페이지
import { useState } from "react";
import Header from "../../components/Header";
import "../../styles/list.css";

import Test1 from "../../imgs/test1.png";
import Test2 from "../../imgs/test2.png";
import Test3 from "../../imgs/test3.png";
import Test4 from "../../imgs/test4.png";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const [dropdown, setDropdown] = useState("");
  const { id } = location.state || {};

  const handleSelectChange = (event) => {
    setDropdown(event.target.value);
  };
  return (
    <div className="main-list-container">
      <Header mode={1} />
      <div className="list-grid-container">
        <div className="list-dropdown-container">
          <select value={dropdown} onChange={handleSelectChange}>
            <option value="option1">모집 중</option>
            <option value="option2">완결</option>
            <option value="option3">연재중</option>
          </select>
        </div>
        <div className="list-container">
          {imageData.map((image) => (
            <div key={image.id} className="list-card">
              <div
                className="list-img"
                style={{ backgroundImage: `url(${image.src})` }}
              >
                <div className="list-img-inner">
                  <div>{image.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
