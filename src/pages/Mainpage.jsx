import Header from "../components/Header";
import Slide from "../components/Slide";
import "../styles/mainpage.css";

import PrevArrowImg from "../imgs/prevArrow.svg";
import NextArrowImg from "../imgs/nextArrow.svg";

export default function Mainpage() {
  return (
    <>
      <Header />
      <div className="main-container">
        <div>
          <div>베스트 책</div>
          <Slide />
        </div>
        <div>
          <div>
            <div>함께 책 만들 작가 모집</div>
            <div>더보기</div>
          </div>
          <Slide />
        </div>
        <div>
          <div>
            <div>완결된 책</div>
            <div>더보기</div>
          </div>
          <Slide />
        </div>
        <div>
          <div>
            <div>진행 중인 책</div>
            <div>더보기</div>
          </div>
          <Slide />
        </div>
      </div>
    </>
  );
}
