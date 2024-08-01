import Header from "../../components/Header";

import TestImg from "../../imgs/test5.png";
import LikeImg from "../../imgs/like.svg";
import WhiteLikeImg from "../../imgs/whiteLike.svg";
import GrayLikeImg from "../../imgs/grayLike.svg";
import RedLikeImg from "../../imgs/redLike.svg";
import CommentArrowImg from "../../imgs/commentArrow.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../styles/detail.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


// 프로젝트 상세 페이지
export default function Detail() {
  const location = useLocation();
  
  const { id } = location.state || {};
  const [like, setLike] = useState(false);
  const [commentsLike, setCommentsLike] = useState(false);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const [project, setProject] = useState();

  const handleSetCommentsLike = () => {
    setCommentsLike(!commentsLike);
  };

  const handleSetLike = () => {
    setLike(!like);
  };

  const addComment = () => {
    if (comment !== "") {
      console.log(comment);
      setComment("");
    }
  };

  function toUpdate() {
    navigate("/update");
  }
  const handleGoCommunity = (id) => {
    navigate("/board", { state: { id } });
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
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          navigate("/", { replace: true });
        });
    };

    fetchProject();
  }, []);

  useEffect(() => {
    console.log(project);
  }, [project]);

  // 클릭한 책의 id
  console.log("id:", id);

  return (
    <div id="detail-main">
      <Header mode={2} />
      <div className="detail-container">
        <div className="detail-above">
          <div className="detail-img-container">
            <div
              style={{ backgroundImage: `url(${TestImg})` }}
              className="detail-img-back"
            ></div>
            <img src={TestImg} alt="img" id="detail-img-cover" />
          </div>
          <div className="detail-above-right">
            <div className="detail-above-right-bottom">
              <div className="detail-mywrite">나도 글쓰기</div>
              <div
                className="detail-goCommunity"
                onClick={() => handleGoCommunity(id)}
              >
                게시판 접속하기
              </div>
              <div className="detail-readbegin">처음부터 읽기</div>
              <div className="detail-like-container">
                <img
                  src={like ? LikeImg : WhiteLikeImg}
                  onClick={() => {
                    handleSetLike();
                  }}
                  alt="like"
                  style={{ width: "22px", height: "20px" }}
                />
                <div>123</div>
              </div>
            </div>
            <div>
              <div>제목</div>
              <div>저자</div>
              <div>책 정보</div>
              <div>정원</div>
            </div>
          </div>
        </div>
        <div id="detail-bookinfo">
          <div>책 소개</div>
          <div id="detail-contents">콘텐츠들</div>
        </div>
        <div id="detail-galpi-container">
          <div>갈비 목록</div>
          <div id="detail-galpi-list">
            <div id="detail-galpi">
              <div>1갈피</div>
              <div>
                <div
                  onClick={() => {
                    toUpdate();
                  }}
                >
                  수정하기
                </div>
                <div>설정</div>
              </div>
            </div>
          </div>
        </div>
        <div id="detail-comments-list">
          <div id="detail-write-comments">
            <input
              type="text"
              id="detail-write-container"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? addComment() : null)}
            />
            <img
              src={CommentArrowImg}
              alt="comment"
              disabled=""
              onClick={() => {
                addComment();
              }}
            />
          </div>
          <div id="detail-comments-container">
            <div>닉네임</div>
            <div>날짜</div>
            <div>이번 작품 너무 재밌어요!</div>
            <div>
              <img
                onClick={() => {
                  handleSetCommentsLike();
                }}
                src={commentsLike ? RedLikeImg : GrayLikeImg}
                alt="like"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
