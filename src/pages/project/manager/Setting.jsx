// 프로젝트 관리 페이지
import { useState, useEffect } from "react";
import { useRef, useCallback } from "react";
//import ModalContainer from "../../../components/ModalContainer";
import ImgUpLoad from "../../../components/ImgUpLoad";
import PeopleSlide from "../../../components/PeopleSlide";
import ImgNone from "../../../imgs/img_none.svg";
import GalpiPlusImg from "../../../imgs/galpiPlus.svg"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../../../styles/setting.scss";

const categories = {
  소설: ["공포", "로맨스", "미스터리/추리", "역사", "판타지", "SF"],
  시: ["감정", "사회", "자연", "철학"],
  에세이: ["개인경험", "사회", "여행", "자기개발"],
  비문학: ["과학", "자기개발", "전기", "역사"],
  드라마: ["가족", "모험", "사회", "정치"],
  기타: ["기타"],
};

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
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  console.log(id);

  const [project, setProject] = useState([]);
  const [like, setLike] = useState();
  const [likeCount, setLikeCount] = useState();
  const [userList, setUserList] = useState([]);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [bigCategory, setBigCategory] = useState("");
  const [category, setCategory] = useState("");

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [information, setInformation] = useState();
  const [selectedCategories, setSelectedCategories] = useState({});
  const [visibility, setVisibility] = useState(); // isPublic
  const [people, setPeople] = useState();
  const [isRecruit, setIsRecruit] = useState(); // isRecruit

  const [image, setImage] = useState(`${ImgNone}`);

  const [participatiedPeople, setparticipatiedPeople] = useState([
    {
      profileImg: "",
      name: "",
    },
  ]);
  const [appliedPeople, setappliedProple] = useState([
    {
      profileImg: "",
      name: "",
    },
  ]);
  const [progress, setProgress] = useState("진행 중"); // isFinish

  // Initial category selection
  useEffect(() => {
    setSelectedCategories({ 소설: project.category });
  }, []);

  const handleCategoryChange = (category, item) => {
    setSelectedCategories((prevSelectedCategories) => {
      const updatedCategories = {
        ...prevSelectedCategories,
        [category]: item,
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
  const handleIsRecruit = (event) => {
    const newVisibility = event.target.value;
    setIsRecruit(newVisibility);
    console.log(newVisibility);
  };

  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    setProgress(newProgress);
    console.log(newProgress);
  };

  // const handlePeople = (upDown) => {
  //   if (upDown === 1) {
  //     setPeople(people + 1);
  //   } else if (upDown === -1) {
  //     if (people !== 1) {
  //       setPeople(people - 1);
  //     }
  //   }
  // };

  const handlePeople = (upDown) => {
    setPeople(prevPeople => {
        if (prevPeople == null) return 0 + upDown;
        return prevPeople + upDown < 0 ? 0 : prevPeople + upDown;
    });
};

  const handleImageUpload = (file) => {
    setImage(file);
  };

  const toBookmark = (id) => {
    navigate("/galpi", { state: { id } });
  };

  const handleSubmit = async (event) => {
    const storedToken = localStorage.getItem("token");

    if (storedToken == null) {
      //navigate("/", { replace: true });
      return;
    }
    event.preventDefault();

    // selectedCategories 객체의 값만 추출하여 문자열로 변환
    const categoriesString = Object.values(selectedCategories).join(", ");

    const value = {
      id: id,
      name: title,
      category: category,
      bigCategory: bigCategory,
      information: information,
      description: description,
      isPublic: visibility === "공개",
      maximumNumber: people,
      isFinished: false,
      isRecruit: true,
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
      const response = await axios.patch(
        "https://likelion.info/project/update",
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

  const deleteBookmark = async (bookmarkId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `https://likelion.info/bookmark/delete/${bookmarkId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
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

  const deleteProject = async (projectId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `https://likelion.info/project/delete/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
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

    const fetchProject = () => {
      axios
        .get(`https://likelion.info/project/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setProject(response.data);
          setUserList(response.data.userProjectList);
          setLike(response.data.isLiked);
          setLikeCount(response.data.likeCount);
          setIsRecruit(response.data.isRecruit);

          setTitle(response.data.name);
          setDescription(response.data.description);
          setInformation(response.data.information);
          setBookmarkList(response.data.bookMarkList);
          setImage(response.imageAddress);
          setPeople(response.data.maximumNumber); // 초기값 설정
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        });
    };

    fetchProject();
  }, []);

  useEffect(() => {
    console.log("project:", project);
  }, [project]);

  console.log("imageAddress" + project.imageAddress);

  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  return (
    <div className="setting-container">
      <form onSubmit={handleSubmit}>
        <div className="title">책 설정/관리</div>

        <div className="setting-menu">
          <div className="setting-title">책 제목</div>
          <input
            className="setting-title-input"
            placeholder=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="setting-menu">
          <div className="setting-title">책 표지 이미지</div>
          <ImgUpLoad
            onImageUpload={handleImageUpload}
            initialImage={project.imageAddress}
          />
        </div>

        <div className="setting-menu">
          <div className="setting-title">책 장르</div>
          <div className="setting-categoryContainer">
            {Object.keys(categories).map((categoriesString) => (
              <div key={categoriesString} className="setting-category">
                <div>{categoriesString}</div>
                {categories[categoriesString].map((item) => (
                  <div key={item} className="setting-radio-item">
                    <input
                      type="radio"
                      id={item}
                      name="genre"
                      checked={project.category === item}
                      onChange={() => {
                        setCategory(item);
                        setBigCategory(categoriesString);
                      }}
                    />
                    <label htmlFor={item} style={{ marginLeft: "5px" }}>
                      {" "}
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="setting-menu">
          <div className="setting-title">책 소개</div>
          <textarea
            className="setting-book-intro-input"
            ref={textRef}
            placeholder=""
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            onInput={handleResizeHeight}
            rows={1}
          />
        </div>

        {/* <div className="create-menu">
          <div className="setting-title">책 정보 </div>
          <textarea
            className="setting-book-infor-input"
            ref={textRef}
            placeholder="책 정보를 입력해주세요."
            value={information || ""}
            onChange={(e) => setInformation(e.target.value)}
            onInput={handleResizeHeight}
            rows={1}
          />
        </div> */}

        <div className="setting-menu">
          <div className="setting-title">갈피 목록</div>
          
          <div className="setting-galpi-list">
            {bookmarkList.map((it, index) => (
              <div className="setting-galpi">
                {index + 1}갈피: {it.name}
                <div>
                  <button onClick={() => deleteBookmark(it.id)} className="setting-galpi-remove-btn">
                    삭제하기
                  </button>
                </div>
              </div>
            ))}
          <div onClick={() => toBookmark(project.id)}><img src={GalpiPlusImg}/></div>
          </div>
        </div>

        <div className="setting-menu">
          <div className="setting-title">책 공개 여부</div>
          <div className="visibility-radio">
            <div>
              <div className="visibility-radio-item">
                <input
                  className="radio"
                  type="radio"
                  id="public"
                  name="visibility"
                  value="공개"
                  checked={project.isPublic === true}
                  onChange={handleVisibilityChange}
                />
                <label htmlFor="public">공개</label>
              </div>
              <div className="visibility-radio-item">
                <input
                  className="radio"
                  type="radio"
                  id="private"
                  name="visibility"
                  value="비공개"
                  checked={project.isPublic === false}
                  onChange={handleVisibilityChange}
                />
                <label htmlFor="private">비공개</label>
              </div>
            </div>
          </div>
        </div>

        <div className="setting-menu">
          <div className="setting-title">작가 모집 여부</div>
          <div className="visibility-radio">
            <div>
              <div className="visibility-radio-item">
                <input
                  className="radio"
                  type="radio"
                  id="public"
                  name="recruit"
                  value="모집 중"
                  checked={project.isRecruit === true}
                  onChange={handleIsRecruit}
                />
                <label htmlFor="public">모집 중</label>
              </div>
              <div className="visibility-radio-item">
                <input
                  className="radio"
                  type="radio"
                  id="private"
                  name="recruit"
                  value="모집 마감"
                  checked={project.isRecruit === false}
                  onChange={handleIsRecruit}
                />
                <label htmlFor="private">모집 마감</label>
              </div>
            </div>
          </div>
        </div>

        <div className="setting-menu">
          <div className="setting-title">작가 정원</div>
          <div className="setting-peopleNum">
            <div className="plus" onClick={() => handlePeople(-1)}>
              -
            </div>
            <div className="num">{people || 0}</div>
            <div className="minus" onClick={() => handlePeople(+1)}>
              +
            </div>
          </div>
        </div>

        <div className="setting-menu">
          <div className="setting-title">책 제작 명단</div>
          <div>
            <PeopleSlide
              mode={1}
              data={project.userProjectList}
              projectId={project.id}
            />
          </div>
        </div>

        <div className="setting-menu">
          <div className="setting-title">신청한 작가 명단</div>
          <div>
            <PeopleSlide
              mode={3}
              data={project.userApplicationList}
              projectId={project.id}
            />
          </div>
        </div>

        <div className="setting-menu">
          <div className="setting-title">책 진행 상태</div>
          <div>
            <div className="visibility-radio-item">
              <input
                className="radio"
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
                className="radio"
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

        <button className="setting-delete-btn" onClick={() => deleteProject(project.id)}>책 발간 취소</button>

        <div className="setting-btn-container">
          <button className="setting-btn" type="submit">저장하기</button>
        </div>
      </form>
    </div>
  );
}
