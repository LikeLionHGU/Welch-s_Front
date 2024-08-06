import Header from "../../components/Header";
// import PeopleSlide from "../../components/PeopleSlide";
// import TestImg from "../../imgs/test5.png";
import LikeImg from "../../imgs/like.svg";
import WhiteLikeImg from "../../imgs/whiteLike.svg";
import GrayLikeImg from "../../imgs/grayLike.svg";
import RedLikeImg from "../../imgs/redLike.svg";
import CommentArrowImg from "../../imgs/commentArrow.svg";
import SettingImg from "../../imgs/setting.svg";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import PeopleSlide from "../../components/PeopleSlide";

import "../../styles/detail.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

// 프로젝트 상세 페이지
export default function Detail() {
  const location = useLocation();
  //const navigate = useNavigate();
  const { id } = location.state || {};
  const [like, setLike] = useState();
  const [likeCount, setLikeCount] = useState();
  const [comment, setComment] = useState("");
  
  const navigate = useNavigate();
  const [project, setProject] = useState(false);
  const [userList, setUserList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [bookmarkList, setBookmarkList] = useState([]);

  const [commentsLike, setCommentsLike] = useState();

  const handleCommentClick = (id) => {
    const user = localStorage.getItem("id");

    if (id === user) {
      navigate("/mypage");
    } else {
      navigate("/profile", { state: { id } });
    }
  };

  const AuthorList = ({ authors = [] }) => {
    return (
      <div>
        {authors.map((author, index) => (
          <div key={index}>{author.name}</div>
        ))}
      </div>
    );
  };

  const BookmarkList = ({ bookmark = [] }) => {
    if (!bookmark || bookmark.length === 0) {
      return null;
    }

    console.log(bookmark);

    

    return (
      <div id="detail-galpi-list">
        {bookmark.map((item, index) => (
          <div key={index} id="detail-galpi">
            <div>
              {index + 1}갈피: {item.name}
            </div> 
            {/* 공유 가능 여부로 먼저 한 번 정렬 */}
            {item.isShared ? (item.isCurrentEdit ? <div
                id="detail-galpi-update-btn-none"
              >
                수정하기
              </div> : <div
                onClick={() => toWrite(item.id)}
                id="detail-galpi-update-btn"
              >
                수정하기
              </div>) : (item.canEdit ? <div
                onClick={() => toWrite(item.id)}
                id="detail-galpi-update-btn"
              >
                수정하기
              </div>: <div
                id="detail-galpi-update-btn-none"
              >
                수정하기
              </div>)}
            <div id="detail-galpi-update-setting">
              {/* <div
                onClick={() => toWrite(item.id)}
                id="detail-galpi-update-btn"
              >
                수정하기
              </div>
              <div
                onClick={() => toWrite(item.id)}
                id="detail-galpi-update-btn-none"
              >
                수정하기
              </div> */}
              {item.canEdit ? <img src={SettingImg} alt="setting" style={{ height: "18px" }} /> : <></>}
              
            </div>
          </div>
        ))}
      </div>
    );
  };

  const deleteComment = async (commentId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `https://likelion.info/project/comment/delete/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Post uploaded successfully");
        // alert("게시물 업로드 성공");
        // navigate("/"); // 성공적으로 업로드 후 메인 페이지로 이동
        setComment("");
        window.location.reload();
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

  const Comment = ({ comment }) => (
    <div id="detail-comments-container">
      <div
        className="detail-comments-name"
        onClick={() => handleCommentClick(comment.user.id)}
      >
        {comment.user.name}
      </div>
      <div className="detail-comments-date">{comment.createdDate}</div>
      <div className="detail-comments-contents">{comment.contents}</div>
      <img
        onClick={() => {
          handleSetCommentsLike(comment.id);
        }}
        src={comment.isLiked ? RedLikeImg : GrayLikeImg}
        alt="like"
      />
      {comment.user.id === localStorage.getItem("id") ? (
        <div onClick={() => deleteComment(comment.id)}>삭제하기</div>
      ) : (
        <></>
      )}
      <div className="detail-comments-bottom"></div>
    </div>
  );

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const request = {
      contents: comment,
    };

    if (comment !== "") {
      // console.log(comment);
      try {
        const response = await axios.post(
          `https://likelion.info/project/comment/add/${id}`,
          request,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          console.log("Post uploaded successfully");
          // alert("게시물 업로드 성공");
          // navigate("/"); // 성공적으로 업로드 후 메인 페이지로 이동
          setComment("");
          window.location.reload();
          
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
    }
  };

  const handleSetProjectLike = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `https://likelion.info/project/like/switch/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Post uploaded successfully");
        // alert("게시물 업로드 성공");
        setLike(!like);
        setLikeCount(like ? likeCount - 1 : likeCount + 1);
        
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

  const handleSetCommentsLike = async (commentId) => {
    const token = localStorage.getItem("token");
    console.log(commentId);

    try {
      const response = await axios.post(
        `https://likelion.info/project/comment/like/${commentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Post uploaded successfully");
        // alert("게시물 업로드 성공");
        // navigate("/"); // 성공적으로 업로드 후 메인 페이지로 이동
        setCommentsLike(!commentsLike);
        window.location.reload();
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

  const handleSetLike = () => {
    setLike(!like);
  };

  const addComment = () => {
    if (comment !== "") {
      console.log(comment);
      setComment("");
    }
  };

  useEffect(() => {
    setLike(project.isLike);
    setLikeCount(project.likeCount);
}, [project.isLike, project.likeCount]);
  


  

  const toParticipate = async () => { // 참여 요청 api
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `https://likelion.info/project/application/request/${project.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Post uploaded successfully");
        // alert("게시물 업로드 성공");
        // navigate("/"); // 성공적으로 업로드 후 메인 페이지로 이동
        window.location.reload(); // 화면 변경 해줘야함
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

  // 글 작성하는 페이지로 이동
  const toWrite = (id) => {
    // 넘겨주는 id는 갈피의 id
    if (project.isOwner) {
      // owner인 경우
      navigate("/update", {
        state: { id: id, user: 2, mode: 0, bookmarkList: bookmarkList },
      });
    }

    if (project.isOwner === false && project.isParticipate === true) {
      navigate("/update", { state: { id, user: 1, mode: 0, bookmarkList } }); // 참여자인 경우
    }

    if (project.isOwner === false && project.isParticipate === false) {
      navigate("/update", { state: { id, user: 0, mode: 0, bookmarkList } }); // 그냥 사람
    }
  };

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
          setUserList(response.data.userProjectList);
          setCommentList(response.data.commentList);
          setLike(response.data.isLiked);
          setLikeCount(response.data.likeCount);
          setBookmarkList(response.data.bookMarkList);
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
    console.log(project);
  }, [project]);

  // 클릭한 책의 id
  // console.log("id", id);

  return (
    <div id="detail-main">
      <Header mode={2} />
      <div className="detail-container">
        <div className="detail-above">
          <div className="detail-img-container">
            <div
              style={{
                backgroundImage: `url(${project.imageAddress})`,
                borderRadius: "16px",
              }}
              className="detail-img-back"
            ></div>
            <img src={project.imageAddress} alt="img" id="detail-img-cover" />
          </div>
          <div className="detail-above-right">
            <div className="detail-above-right-bottom">
              <div
                className="detail-mywrite"
                onClick={() => {
                  toParticipate();
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
                    handleSetProjectLike();
                  }}
                  alt="like"
                  v
                  style={{ width: "22px", height: "20px" }}
                />
                <div>{likeCount}</div>
              </div>
            </div>
            <div id="detail-right-above">
              <div id="detail-right-above-name">{project.name}</div>
              <div>{project.description}</div>
              <div>{project.maximumNumber}명</div>
            </div>
          </div>
        </div>
        <div id="about-the-writer">
          <div className="detail-title">작가 소개</div>
          <PeopleSlide mode={0} data={userList} />
        </div>
        <div id="detail-bookinfo">
          <div className="detail-title">책 소개</div>
          <div id="detail-contents">{project.information}</div>
        </div>
        <div id="detail-galpi-container">
          <div className="detail-title">갈피 목록</div>
          <BookmarkList bookmark={bookmarkList} />
        </div>
        <div id="detail-comments-list">
          <div id="detail-write-comments">
            <input
              type="text"
              id="detail-write-container"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
            />
            <img
              id="comment-arrow-img"
              src={CommentArrowImg}
              alt="comment"
              disabled=""
              onClick={() => {
                handleSubmit();
              }}
            />
          </div>
          <div id="detail-comments-container">
            <div id="detail-comments-container">
            {Array.isArray(commentList) && commentList.map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
