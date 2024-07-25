import Header from "../components/Header";
import Slide from "../components/Slide";
import "../styles/mainpage.css";

export default function Mainpage() {
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="section">
          <div>베스트 책</div>
          <div className="slide-container">
            <Slide />
          </div>
        </div>
        <div className="section">
          <div className="section-above">
            <div>함께 책 만들 작가 모집</div>
            <div>더보기</div>
          </div>
          <div className="slide-container">
            <Slide />
          </div>
        </div>
        <div className="section">
          <div className="section-above">
            <div>완결된 책</div>
            <div>더보기</div>
          </div>
          <div className="slide-container">
            <Slide />
          </div>
        </div>
        <div className="section">
          <div className="section-above">
            <div>진행 중인 책</div>
            <div>더보기</div>
          </div>
          <div className="slide-container">
            <Slide />
          </div>
        </div>
      </div>
    </>
  );
}
