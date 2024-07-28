import Header from "../components/Header";
import Slide from "../components/Slide";
import { useNavigate } from "react-router-dom";
import "../styles/mainpage.css";

export default function Mainpage() {
  const navigate = useNavigate();

  function toList() {
    navigate("/list");
  }

  return (
    <div className="main-page">
      <Header />
      <div className="main-page-container">
        <div className="main-section" id="best-book">
          <div className="main-section-above" id="best-above">
            베스트 책
          </div>
          <div className="main-slide-container">
            <Slide mode={1} />
          </div>
        </div>
        <div className="main-section">
          <div className="main-section-above">
            <div>함께 책 만들 작가 모집</div>
            <div
              onClick={() => {
                toList();
              }}
            >
              더보기
            </div>
          </div>
          <div className="main-slide-container">
            <Slide mode={0} />
          </div>
        </div>
        <div className="main-section">
          <div className="main-section-above">
            <div>완결된 책</div>
            <div
              onClick={() => {
                toList();
              }}
            >
              더보기
            </div>
          </div>
          <div className="main-slide-container">
            <Slide mode={0} />
          </div>
        </div>
        <div className="main-section">
          <div className="main-section-above">
            <div>진행 중인 책</div>
            <div
              onClick={() => {
                toList();
              }}
            >
              더보기
            </div>
          </div>
          <div className="main-slide-container">
            <Slide mode={0} />
          </div>
        </div>
      </div>
    </div>
  );
}
