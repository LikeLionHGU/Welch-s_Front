import Header from "../../components/Header";

// 프로젝트 상세 페이지
export default function Detail() {
  return (
    <>
      <Header />
      <div>
        <div>
          <div>img</div>
          <div>
            <div>
              <div>제목</div>
              <div>저자</div>
              <div>책 정보</div>
              <div>정원</div>
            </div>
            <div>
              <div>나도 글쓰기</div>
              <div>처음부터 읽기</div>
              <div>
                <div>좋아요</div>
                <div>123</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>책 소개</div>
          <div>콘텐츠들</div>
        </div>
        <div>
          <div>갈비 목록</div>
          <div>
            <div>
              <div>1갈피</div>
              <div>
                <div>수정하기</div>
                <div>설정</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button>게시판 접속하기</button>
        </div>
        <div>댓글</div>
      </div>
    </>
  );
}
