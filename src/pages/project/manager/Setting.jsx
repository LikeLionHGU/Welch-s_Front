// 프로젝트 관리 페이지
import { useState } from "react";
//import ModalContainer from "../../../components/ModalContainer";
import ImgUpLoad from "../../../components/ImgUpLoad";
import PeopleSlide from '../../../components/PeopleSlide'
import ImgNone from "../../../imgs/img_none.svg";
import axios from "axios";

import "../../../styles/setting.scss"

const categories = {
  소설: ["공포", "로맨스", "미스터리/추리", "역사", "판타지", "SF"],
  시: ["감정", "사회", "자연", "철학"],
  에세이: ["개인경험", "사회", "여행", "자기개발"],
  비문학: ["과학", "자기개발", "전기", "역사"],
  드라마: ["가족", "모험", "사회", "정치"],
  기타: ["기타"],
}

export default function Setting() {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const openModal = () => setModalIsOpen(true);
  // const closeModal = () => setModalIsOpen(false);
  // return (
  //   <>
  //     <button onClick={openModal}>Open Modal</button>
  //     <ModalContainer isOpen={modalIsOpen} closeModal={closeModal} />
  //   </>
  // );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState({});
  const [visibility, setVisibility] = useState("공개");
  const [people, setPeople] = useState(0);
  const [image, setImage] = useState(`${ImgNone}`);
  const [galpi, setGalpi] = useState([
    {
      index : 1,
      title : "이동규 짱", 
    }
  ]);
  const [participatiedPeople, setparticipatiedPeople] = useState([{
    profileImg : "",
    name : "",
  }]);
  const [appliedPeople, setappliedProple] = useState([{
    profileImg : "",
    name : "",
  }]);
  const [progress, setProgress] = useState("진행 중");

  const handleCategoryChange = (category, item) => {
    setSelectedCategories((prevSelectedCategories) => {
      const updatedCategories = {
        ...prevSelectedCategories,
        [category]: item,
      };
      console.log(updatedCategories);
      return updatedCategories;
    })
  };

  const handleVisibilityChange = (event) => {
    const newVisibility = event.target.value;
    setVisibility(newVisibility);
    console.log(newVisibility);
  }

  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    setProgress(newProgress);
    console.log(newProgress);
  }

  const handlePeople = (upDown) => {
    if (upDown === 1) {
      setPeople(people + 1);
    } else if (upDown === -1) {
      if (people !== 1) {
        setPeople(people - 1);
      }
    }
  };

  const handleImageUpload = (file) => {
    setImage(file);
  };

  const storedToken = localStorage.getItem("token");

  if (storedToken == null) {
    //navigate("/", { replace: true });
    return;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // selectedCategories 객체의 값만 추출하여 문자열로 변환
    const categoriesString = Object.values(selectedCategories).join(", ");

    const value = {
      name: title,
      category: categoriesString,
      information: description,
      isPublic: visibility === "공개",
      maximumNumber: people,
      isFinished: false,
      isRecruit: true,
      isProgress: progress === "진행 중"
    };

    console.log(value);
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "post",
      new Blob([JSON.stringify(value)], {
        type: "application/json",
      })
    );

    try {
      const response = await axios.post(
        "https://likelion.info/project/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Post uploaded successfully");
        // alert("게시물 업로드 성공");
        //navigate("/"); // 성공적으로 업로드 후 메인 페이지로 이동
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
      //navigate("/", { replace: true });
    }
  };

  return (
    <div className="setting-container">
      <form onSubmit={handleSubmit}>
        <div className="title">책 설정/관리</div>

        <div className="setting-menu">
          <div>책 제목*</div>
          <input
            placeholder=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="setting-menu">
          <div>책 표지 이미지</div>
          <ImgUpLoad onImageUpload={handleImageUpload} />
        </div>

        <div className="setting-menu">
          <div>책 장르 *</div>
          <div className="setting-categoryContainer">
          {Object.keys(categories).map((category) => (
              <div key={category} className="setting-category">
                <div>{category}</div>
                {categories[category].map((item) => (
                  <div key={item} className="setting-radio-item">
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

        <div className="setting-menu">
          <div>책 소개 *</div>
          <input
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="setting-menu">
          <div>갈피 목록</div>
          <div>
            {galpi.map((it) => (
              <di>
                {it.index}갈피: {it.title}
                <di>
                  <button>
                    삭제하기
                  </button>
                </di>
              </di>
            ))}
          </div>
        </div>

        <div className="setting-menu">
          <div>책 공개 여부</div>
          <div>
            <div className="visibility-radio-item">
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
            <div className="visibility-radio-item">
              <input
                type="radio"
                id="public"
                name="visibility"
                value="비공개"
                checked={visibility === "비공개"}
                onChange={handleVisibilityChange}
              />
              <label htmlFor="private">비공개</label>
            </div>
          </div>
        </div>

        <div className="setting-menu">
          <div>작가 정원 *</div>
          <div className="setting-peopleNum">
            <div onClick={() => handlePeople(-1)}>-</div>
            <div>{people}</div>
            <div onClick={() => handlePeople(+1)}>+</div>
          </div>
        </div>

        <div className="setting-menu">
          <div>책 제작 명단</div>
          <div><PeopleSlide mode={1} data={participatiedPeople}/></div>
        </div>

        <div className="setting-menu">
          <div>신청한 작가 명단</div>
          <div><PeopleSlide mode={1} data={appliedPeople}/></div>
        </div>

        <div className="setting-menu">
          <div>책 진행 상태</div>
          <div>
            <div className="visibility-radio-item">
              <input
                type="radio"
                id="progress"
                name="progress"
                value="진행 중"
                checked={progress === "진행 중"}
                onChange={handleProgressChange}
              />
              <label htmlFor="progress">진행 중</label>
            </div>
            <div className="visibility-radio-item">
              <input
                type="radio"
                id="finished"
                name="progress"
                value="완결"
                checked={progress === "완결"}
                onChange={handleProgressChange}
              />
              <label htmlFor="finished">비공개</label>
            </div>
          </div>
        </div>

        <button>책 발간 취소</button>
        <button type="submit">저장하기</button>
      </form>
    </div>
  )
}
