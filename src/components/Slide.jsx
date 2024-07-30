import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import NextArrowImg from "../imgs/nextArrow.svg";
import PrevArrowImg from "../imgs/prevArrow.svg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "../styles/slide.css";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";
SwiperCore.use([Autoplay]);

// mode === 0 : 다른 책 슬라이드, mode === 1 : 베스트 책 슬라이드, mode === 2
export default function Slide({ mode }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="slide-container">
      {mode === 1 ? (
        // <div className="arrow"></div>
        <></>
      ) : (
        <button className="arrow" ref={prevRef}>
          <img src={PrevArrowImg} alt="prevarrow" />
        </button>
      )}
      <Swiper
        // 한번에 보이는 슬라이드
        slidesPerView={mode === 1 ? 2.7 : (mode === 2 ? 6.3 : 4)}
        // 슬라이드 사이 거리
        spaceBetween={15}
        // 중간으로
        // centeredSlides={true}
        // 무한
        loop={true}
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
        slidesOffsetBefore={mode === 1 ? 85 : 0}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="book-info">
            <div>title</div>
            <div>author</div>
            <div>category</div>
          </div>
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
      {mode === 1 ? (
        // <div className="arrow"></div>
        <></>
      ) : (
        <button className="arrow" ref={nextRef}>
          <img src={NextArrowImg} alt="nextarrow" />
        </button>
      )}
    </div>
  );
}
