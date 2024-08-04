import LogoImg from "../imgs/logo.svg";
import SearchImg from "../imgs/search.svg";
import ProfileImg from "../imgs/myprofile.svg";
import GuideImg from "../imgs/guide.svg";
import "../styles/header.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { bigCategoryState, categoryState } from "../atom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// mode == 0 : 메인 페이지, mode == 1 : 전체 페이지, mode == 2 : 프로젝트 상세 페이지, mode == 3 그 외에 페이지
export default function Header({ mode }) {
  const [bigCategory, setedBigCategory] = useRecoilState(bigCategoryState);
  const [Category, setCategory] = useRecoilState(categoryState);
  const [onLogin, setOnLogin] = useState();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const query = useQuery();
  const navigate = useNavigate();

  const categories = {
    소설: ["전체", "공포", "로맨스", "미스터리", "판타지", "SF"],
    시: ["전체", "감정", "사회", "자연", "철학"],
    에세이: ["전체", "개인경험", "사회", "여행", "자기개발"],
    비문학: ["전체", "과학", "자기개발", "전기", "역사"],
    드라마: ["전체", "가족", "모험", "사회", "정치"],
    기타: ["기타"],
  };

  // const checkStatus = (status) => {
  //   if(status === "모집 중") {
  //     setIsRecruit(true);
  //   } else if(status === "연재 중") {
  //     setIsFinished(false);
  //   } else { // 완결
  //     setIsFinished(true);
  //   }
  // };

  const handleCategoryClick = (category) => {
    setedBigCategory(category);
    setCategory("전체");
    if (mode === 0) {
      // 카테고리를 넘겨야 함
      navigate("/list", {
        state: {
          category: null,
          bigCategory: category,
          isFinished: false,
          isRecruit: true,
        },
      });
    }
  };

  const handleSmallCategoryClick = (Category) => {
    setCategory(Category);
    // console.log(Category);
  };

  useEffect(() => {
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setOnLogin(true);
      navigate("/", { replace: true });
    }
    const storedToken = localStorage.getItem("token");
    setIsLoading(false); // 로딩 상태 완료

    if (storedToken == null) {
      setOnLogin(false);
      navigate("/", { replace: true });
      return;
    } else {
      setOnLogin(true);
    }
  }, []);

  function toCreate() {
    navigate("/create");
  }

  function toMain() {
    navigate("/");
  }

  function toMyPage() {
    navigate("/mypage");
  }

  if (isLoading) {
    return <div></div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <div id="header">
      <div className="header-headerContainer">
        <div className="header-haederLogo">
          <img
            src={LogoImg}
            alt="logo"
            onClick={() => {
              toMain();
            }}
          />
        </div>
        {/* 프로젝트 상세 페이지일 경우 검색창을 없앰 */}
        {mode === 2 || mode === 3 ? (
          <div
            className="header-searchContainer"
            style={{ border: "none" }}
          ></div>
        ) : (
          <div className="header-searchContainer">
            <input className="header-searchBox" placeholder="책 제목, 작가명" />
            <img src={SearchImg} alt="search" />
          </div>
        )}

        <div className="header-headerRight">
          {onLogin ? (
            <>
              <button
                id="goWrite"
                onClick={() => {
                  toCreate();
                }}
              >
                책 발간하기
              </button>

              <div className="header-guide">
                <img
                  className="header-guide-img"
                  src={GuideImg}
                  alt="guide"
                  onClick={() => {}}
                />
                <button id="goGuide">가이드</button>
              </div>

              <img
                className="header-profile"
                src={ProfileImg}
                alt="profile"
                onClick={() => {
                  toMyPage();
                }}
              />
            </>
          ) : (
            <button
              id="goLogin"
              onClick={() => {
                window.location.href =
                  "https://likelion.info/login/oauth2/google";
              }}
            >
              로그인
            </button>
          )}
        </div>
      </div>
      {/* 프로젝트 이외에 경우에는 카테고리를 안보여줘도 됨 */}
      {/* detail 페이지도 */}
      {mode === 3 || mode === 2 ? (
        <></>
      ) : (
        <div className="header-categoryContainer">
          <div className="header-category" id="upper-category">
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                onClick={() => {
                  handleCategoryClick(category);
                }}
                style={
                  bigCategory === category && mode !== 0
                    ? { fontWeight: "700" }
                    : {}
                }
              >
                {category}
              </button>
            ))}
          </div>
          {/* 프로젝트 전체 페이지일 경우 보여줌 */}
          {mode === 1 ? (
            <div
              className="header-category"
              id="header-small-category-container"
            >
              {categories[bigCategory] &&
                categories[bigCategory].map((option, index) => (
                  <button
                    key={index}
                    id="header-small-category"
                    onClick={() => {
                      handleSmallCategoryClick(option);
                    }}
                    style={Category === option ? { fontWeight: "700" } : {}}
                  >
                    {option}
                  </button>
                ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
