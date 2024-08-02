// 관리자 승인/버전별 수정/편집 페이지
import Write from "../../../components/Write";

import "../../../styles/approval.css";

export default function Approval() {
  return (
    <div className="approval-write">
      {/* 참여자가 수정한 것 */}
      <Write user={2} mode={2} />
      {/* 원본 */}
      <Write user={2} mode={1} />
    </div>
  );
}
