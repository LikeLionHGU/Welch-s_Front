import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import React, { Component } from "react";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slide.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="nextArrow"
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="prevArrow"
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true, // 아래 점들
      infinite: true, // 무한으로 돌것인가
      speed: 500, // 넘어갈 때 속도
      slidesToShow: 1, // 한번에 볼 수 있는 슬라이드 개수
      slidesToScroll: 1, // 한번에 넘어가는 슬라이드 개수
      arrow: true, // 양쪽 버튼
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      //   autoplay: false, // 자동으로 넘어가는가
      //   autoplaySpeed: 0, // 이동하는 속도
      //   cssEase: 'liner', // 이동 스타일
    };
    return (
      <>
        <Slider {...settings} className="slide-container">
          <div>
            <h3>first slide</h3>
          </div>
          <div>
            <h3>second slide</h3>
          </div>
          <div>
            <h3>third slide</h3>
          </div>
          <div>
            <h3>fourth slide</h3>
          </div>
          <div>
            <h3>fifth slide</h3>
          </div>
        </Slider>
      </>
    );
  }
}
