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
//import { useNavigate } from "react-router-dom";

// 프로젝트 상세 페이지
export default function Detail() {
  const location = useLocation();
  //const navigate = useNavigate();
  const { id } = location.state || {};
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const [project, setProject] = useState(false);
  const [userList, setUserList] = useState([]);
  const [commentList, setCommentList] = useState([]);

  const [commentName, setcommentName] = useState("김동규");
  const [commentDate, setCommentDate] = useState("2024.08.01");
  const [commentText, setCommentText] = useState("재밌다.");
  const [commentsLike, setCommentsLike] = useState(false);

  const AuthorList = ({ authors = [] }) => {
    return (
      <div>
        {authors.map((author, index) => (
          <div key={index}>{author.name}</div>
        ))}
      </div>
    );
  };

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
          setUserList(project.userProjectList);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        });
    };

    fetchProject();
  }, []);

  // useEffect(() => {
  //   console.log(project);
  // }, [project]);

  // 클릭한 책의 id
  // console.log("id", id);

  return (
    <div id="detail-main">
      <Header mode={2} />
      <div className="detail-container">
        <div className="detail-above">
          <div className="detail-img-container">
            <div
              style={{ backgroundImage: `url(${project.imageAddress})` }}
              className="detail-img-back"
            ></div>
            <img src={project.imageAddress} alt="img" id="detail-img-cover" />
          </div>
          <div className="detail-above-right">
            <div className="detail-above-right-bottom">
              <div
                className="detail-mywrite"
                onClick={() => {
                  toUpdate();
                }}
              >
                나도 글쓰기
              </div>
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
              <div>{project.name}</div>
              <div>
                <AuthorList authors={userList} />
              </div>
              <div>책 정보</div>
              <div>{project.maximumNumber}명</div>
            </div>
          </div>
        </div>
        <div id="detail-bookinfo">
          <div>책 소개</div>
          <div id="detail-contents">{project.information}</div>
        </div>
        <div id="detail-galpi-container">
          <div>갈비 목록</div>
          <div id="detail-galpi-list">
            <div id="detail-galpi">
              <div>1갈피</div>
              <div>
                <div>수정하기</div>
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
            <div>{commentName}</div>
            <div>{commentDate}</div>
            <div>{commentText}</div>
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
