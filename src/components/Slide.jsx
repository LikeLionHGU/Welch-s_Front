import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useNavigate } from "react-router-dom";

import NextArrowImg from "../imgs/nextArrow.svg";
import PrevArrowImg from "../imgs/prevArrow.svg";
import SettingImg from "../imgs/setting.svg";
import CrownImg from "../imgs/crown.svg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../styles/slide.css";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";
SwiperCore.use([Autoplay]);

const SlideContent = ({ data, mode }) => {
  return mode === 1 ? (
    <div className="slide-best-container">
      <div className="slide-best-left">
        <div className="slide-best-category">{data.category}</div>
        <div>{data.information}</div>
      </div>
      <div className="slide-best-img-container">
        <div
          className="slide-best-img"
          style={{
            backgroundImage: `url(${data.imageAddress})`,
          }}
        ></div>
      </div>
    </div>
  ) : mode === 0 ? (
    <div
      className="slide-content"
      style={{
        backgroundImage: `url(${data.imageAddress})`,
      }}
      alt={data.name}
    >
      <div className="slide-book-info">
        <div>{data.name}</div>
        <div>{data.information}</div>
        <div>{data.category}</div>
      </div>
    </div>
  ) : (
    <div
      className="slide-content"
      style={{
        backgroundImage: `url(${data.imageAddress})`,
      }}
      alt={data.name}
    >
      {data.isOwner ? (
        <div
          className="slide-book-info"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={CrownImg} alt="crown" />
          <div>{data.name}</div>
          <img src={SettingImg} alt="setting" />
        </div>
      ) : (
        <div className="slide-book-info" style={{ justifyContent: "center" }}>
          <div>{data.name}</div>
        </div>
      )}
    </div>
  );
};

// mode === 0 : 다른 책 슬라이드, mode === 1 : 베스트 책 슬라이드, mode === 2
export default function Slide({ mode, data }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const navigate = useNavigate();

  const handleSlideClick = (id) => {
    navigate("/detail", { state: { id } });
    console.log("id:", data);
  };
  return (
    <div
      className="slide-container"
      style={mode === 1 ? { height: "345px" } : { height: "200px" }}
    >
      {mode === 1 ? (
        // <div className="arrow"></div>
        <></>
      ) : (
        <button className="slide-arrow" ref={prevRef}>
          <img src={PrevArrowImg} alt="prevarrow" />
        </button>
      )}
      <Swiper
        // 한번에 보이는 슬라이드
        slidesPerView={mode === 1 ? 2.7 : mode === 2 ? 6.3 : 4}
        // 슬라이드 사이 거리
        spaceBetween={15}
        // 중간으로
        // centeredSlides={true}
        // 무한
        // loop={true}
        // 자동
        autoplay={
          mode === 1 ? { delay: 3000, disableOnInteraction: false } : false
        }
        // 전환 시간
        speed={mode === 1 ? 3000 : 500}
        // 화살표
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current, // 이전 버튼
          nextEl: nextRef.current, // 다음 버튼
        }}
        // 시작지점 빈공간
        // slidesOffsetBefore={mode === 1 ? 85 : 0}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="slide-mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} onClick={() => handleSlideClick(item.id)}>
            <SlideContent data={item} mode={mode} />
          </SwiperSlide>
        ))}
      </Swiper>
      {mode === 1 ? (
        // <div className="arrow"></div>
        <></>
      ) : (
        <button className="slide-arrow" ref={nextRef}>
          <img src={NextArrowImg} alt="nextarrow" />
        </button>
      )}
    </div>
  );
}
