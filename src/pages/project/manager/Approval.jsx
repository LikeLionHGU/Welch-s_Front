// 관리자 승인/버전별 수정/편집 페이지
import Write from "../../../components/Write";

import "../../../styles/approval.css";
import { useLocation } from "react-router-dom";

// 갈피 아이디를 보내줘야 함

export default function Approval() {
  const location = useLocation();
  const { id, updatedId } = location.state || {}; // id는 현재 갈피 id / updatedId는 현재 업데이트 된 갈피의 id

  // console.log(updatedId);
  // console.log(id);

  return (
    <div className="approval-write">
      {/* 원본 */}
      <Write user={2} mode={1} id={id} />
      {/* 참여자가 수정한 것 */}
      <Write user={2} mode={2} id={id} updatedId={updatedId} />
    </div>
  );
}
