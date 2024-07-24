import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import "../styles/slide.css";

export default function Slide() {
  // 커스텀 이전 화살표 컴포넌트
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          // display: "block",
          background: "gray",
          borderRadius: "50px",
          padding: "0",
          paddingBottom: "-1px",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  };

  // 커스텀 다음 화살표 컴포넌트
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          // display: "block",
          background: "gray",
          zIndex: 1,
          marginRight: "10px",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dots: true, // 아래 점들
    infinite: true, // 무한으로 돌것인가
    speed: 500, // 넘어갈 때 속도
    slidesToShow: 4, // 한번에 볼 수 있는 슬라이드 개수
    slidesToScroll: 1, // 한번에 넘어가는 슬라이드 개수
    arrows: true, // 양쪽 버튼
    //   autoplay: false, // 자동으로 넘어가는가
    //   autoplaySpeed: 0, // 이동하는 속도
    //   cssEase: 'liner', // 이동 스타일
  };

  return (
    <div>
      <Slider {...settings} className="slide-container">
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3 style={{ backgroundColor: "#999999" }}>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}
