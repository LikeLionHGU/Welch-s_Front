// 글 수정 페이지
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Write from "../../components/Write";
import { useRecoilState } from "recoil";
import { historyState } from "../../atom";
import "../../styles/update.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// user === 0 : 독자, 1: 참여자, 2: 관리자
export default function Update() {
  const location = useLocation();
  const navigate = useNavigate();
  const [history, setHistory] = useRecoilState(historyState);
  const { id, user, mode, bookmarkList } = location.state || {}; // id는 갈피의 id

  const [confirmedList, setConfirmedList] = useState([]); // 검토 완료
  const [waitPostList, setWaitPostList] = useState([]); // 검토 대기
  const [approvedPostList, setApprovedPostList] = useState([]); // 승인 되어있는 항목

  const BookmarkList = ({ bookmark = [] }) => {
    if (!bookmark || bookmark.length === 0) {
      return null;
    }

    return (
      <div id="detail-galpi-list">
        {bookmark.map((item, index) => (
          <div key={index} id="detail-galpi">
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    );
  };

  const PostList = () => {
    if (user === 2) {
      // 관리자 / 승인 여부 상관 X
      return (
        <div>
          <div>검토 대기 기록</div>
          <br></br>
          {waitPostList.map((item, index) => (
            <div key={index}>
              <div>{item.updatedDate}</div>
              <div>{item.user.name}</div>
              <div onClick={() => toApprove(item.id)}>검토하러 가기</div>
              <br></br>
            </div>
          ))}
          <div>모든 버전</div>
          <br></br>
          {confirmedList.map((item, index) => (
            <div key={index}>
              <div>{item.updatedDate}</div>
              <div>{item.user.name}</div>
            </div>
          ))}
        </div>
      );
    } else if (user === 1) {
      // 참여자 / 승인 여부 상관 X
      return (
        <div>
          <div>모든 버전</div>
          {confirmedList.map((item, index) => (
            <div key={index}>
              <div>{item.updatedDate}</div>
              <div>{item.user.name}</div>
            </div>
          ))}
        </div>
      );
    } else {
      // 독자 / 승인된 post만 보여줌
      return (
        <div>
          <div>모든 버전</div>
          {approvedPostList.map((item, index) => (
            <div key={index}>
              <div>{item.updatedDate}</div>
              <div>{item.user.name}</div>
            </div>
          ))}
        </div>
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token == null) {
      navigate("/", { replace: true });
      return;
    }

    const fetchWaitPosts = () => {
      axios
        .get(`https://likelion.info/post/get/wait/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setWaitPostList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        });
    };

    const fetchConfirmedPosts = () => {
      axios
        .get(`https://likelion.info/post/get/confirmed/all/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setConfirmedList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        });
    };

    const fetchApprovedPosts = () => {
      axios
        .get(`https://likelion.info/post/get/approve/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setApprovedPostList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        });
    };

    fetchApprovedPosts();
    fetchConfirmedPosts();
    fetchWaitPosts();
  }, []);

  useEffect(() => {
    console.log(confirmedList);
  }, [confirmedList]);

  const toApprove = (updatedId) => {
    // 넘겨주는 id는 갈피의 id

    navigate("/approval", { state: { id: id, updatedId: updatedId } });
  };

  return (
    <div id="update-main-container">
      <Header mode={3} />
      <div id="update-write-container">
        <div id="update-left">
          {user === 0 ? (
            <div id="update-left-contents">
              <div>갈피 목록</div>
              <div>
                <BookmarkList bookmark={bookmarkList} />
              </div>
            </div>
          ) : user === 1 ? (
            <div id="update-left-contents">
              <div>미승인 사유</div>
              <div>
                <div>현재 승인 검토가 진행되지 않음</div>
              </div>
            </div>
          ) : (
            <div
              id="update-left-contents"
              style={{ background: "white" }}
            ></div>
          )}
        </div>
        <div id="update-middle">
          <Write user={user} mode={0} id={id} />
        </div>
        <div id="update-right">
          <div
            id="update-right-contents"
            style={history ? { background: "white" } : {}}
          >
            {history ? (
              <></>
            ) : user === 0 ? (
              <div>
                <div>History</div>
                <div>
                  <div>승인 대기 기록</div>
                  <div>07.11</div>
                  <div>23:00</div>
                  <div>저자</div>
                </div>
                <div>
                  <div>버전 기록</div>
                  <div>07.11</div>
                  <div>23:00</div>
                  <div>저자</div>
                </div>
              </div>
            ) : user === 1 ? (
              <div>
                <div>History</div>
                <div>
                  <div>버전 기록</div>
                  <div>07.11</div>
                  <div>23:00</div>
                  <div>저자</div>
                </div>
                <div>승인/미승인</div>
              </div>
            ) : (
              <div>
                <div>History</div>
                <div>
                  <PostList />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
