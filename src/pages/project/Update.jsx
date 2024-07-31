// 글 수정 페이지
import { useState } from "react";
import Header from "../../components/Header";
import Write from "../../components/Write";

import "../../styles/update.css";

// user === 0 : 독자, 1: 참여자, 2: 관리자
export default function Update() {
  const [user, setUser] = useState(0);
  return (
    <div id="update-main-container">
      <Header mode={3} />
      <div id="update-write-container">
        <div id="update-left">
          {user === 0 ? (
            <div id="update-left-contents">
              <div>갈피 목록</div>
              <div>
                <div>1갈피..</div>
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
          <Write />
        </div>
        <div id="update-right">
          <div id="update-right-contents">
            {user === 0 ? (
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
                  <div>
                    <div>승인 대기 기록</div>
                    <div>07.11</div>
                    <div>23:00</div>
                    <div>저자</div>
                  </div>
                  <div>승인하러 가기</div>
                </div>
                <div>
                  <div>
                    <div>버전 기록</div>
                    <div>07.11</div>
                    <div>23:00</div>
                    <div>저자</div>
                  </div>
                  <div>승인/미승인</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
