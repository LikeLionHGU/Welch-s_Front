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
      <div id="update-galpi-list">
        {bookmark.map((item, index) => (
          <div key={index} id="update-galpi">
            {index + 1}갈피: {item.name}
          </div>
        ))}
      </div>
    );
  };

  const PostList = () => {
    const formatDateParts = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-based
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      return {
        year,
        month: month < 10 ? `0${month}` : month,
        day: day < 10 ? `0${day}` : day,
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
      };
    };

    const renderDateParts = (dateParts) => {
      return (
        <div id="update-date-container">
          <div className="update-date-inner" id="update-date-inner-month">
            <div>{dateParts.month}.</div>
            <div>{dateParts.day}</div>
          </div>
          <div className="update-date-inner" id="update-date-inner-time">
            <div>{dateParts.hours}:</div>
            <div>{dateParts.minutes}</div>
          </div>
        </div>
      );
    };
    if (user === 2) {
      // 관리자 / 승인 여부 상관 X
      return (
        <div className="update-right-history-container">
          <div className="update-right-history-title">History</div>
          <div className="update-right-history-approval-box">
            <div className="update-right-history-contents-title">
              승인 대기 기록
            </div>
            {waitPostList.map((item, index) => (
              <div
                className="update-right-history-date-approval-name"
                key={index}
              >
                <div className="update-right-date-approval-box">
                  <div className="update-right-date">
                    {renderDateParts(formatDateParts(item.updatedDate))}
                  </div>
                  <div
                    className="update-right-approval"
                    onClick={() => toApprove(item.id)}
                  >
                    승인하러 가기
                  </div>
                </div>
                <div className="update-right-name">{item.user.name}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="update-right-history-contents-title">버전 기록</div>
            {confirmedList.map((item, index) => (
              <div
                key={index}
                className="update-right-history-date-approval-name"
              >
                <div>
                  <div className="update-right-date-approval-box">
                    <div className="update-right-date">
                      {renderDateParts(formatDateParts(item.updatedDate))}
                    </div>
                    <div>
                      {item.isApproved ? (
                        <div
                          className="update-right-approval"
                          style={{
                            border: "1px solid #5CA54B",
                            color: "#5CA54B",
                            padding: "3px 10px ",
                          }}
                        >
                          승인
                        </div>
                      ) : (
                        <div
                          className="update-right-approval"
                          style={{
                            border: "1px solid #FF4343",
                            color: "#FF4343",
                            padding: "3px 10px ",
                          }}
                        >
                          미승인
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="update-right-name">{item.user.name}</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (user === 1) {
      // 참여자 / 승인 여부 상관 X
      return (
        <div className="update-right-history-container">
          <div className="update-right-history-title">History</div>
          <div className="update-right-history-contents-title">버전 기록</div>
          {confirmedList.map((item, index) => (
            <div
              key={index}
              className="update-right-history-date-approval-name"
            >
              <div>
                <div className="update-right-date-approval-box">
                  <div className="update-right-date">
                    {renderDateParts(formatDateParts(item.updatedDate))}
                  </div>
                  <div>
                    {item.isApproved ? (
                      <div
                        className="update-right-approval"
                        style={{
                          border: "1px solid #5CA54B",
                          color: "#5CA54B",
                          padding: "3px 10px ",
                        }}
                      >
                        승인
                      </div>
                    ) : (
                      <div
                        className="update-right-approval"
                        style={{
                          border: "1px solid #FF4343",
                          color: "#FF4343",
                          padding: "3px 10px ",
                        }}
                      >
                        미승인
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="update-right-name">{item.user.name}</div>
            </div>
          ))}
        </div>
      );
    } else {
      // 독자 / 승인된 post만 보여줌
      return (
        <div className="update-right-history-container">
          <div className="update-right-history-title">History</div>
          <div className="update-right-history-contents-title">버전 기록</div>
          {approvedPostList.map((item, index) => (
            <div key={index}>
              <div
                key={index}
                className="update-right-history-date-approval-name"
              >
                <div>
                  <div className="update-right-date-approval-box">
                    <div className="update-right-date">
                      {renderDateParts(formatDateParts(item.updatedDate))}
                    </div>
                  </div>
                </div>
                <div className="update-right-name">{item.user.name}</div>
              </div>
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
              <div id="update-left-contents-title">갈피 목록</div>
              <div>
                <BookmarkList bookmark={bookmarkList} />
              </div>
            </div>
          ) : user === 2 ? (
            <div id="update-left-contents">
              <div id="update-left-no-approval">미승인 사유</div>
              <div>
                <div id="update-left-no-approval-contents">
                  현재 승인 검토가 진행되지 않음
                </div>
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
            {history ? <></> : <PostList />}
          </div>
        </div>
      </div>
    </div>
  );
}
