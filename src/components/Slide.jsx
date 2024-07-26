import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import NextArrowImg from "../imgs/nextArrow.svg";
import PrevArrowImg from "../imgs/prevArrow.svg";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/slide.css";

// import required modules
import { Navigation } from "swiper/modules";

export default function App() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="slide-container">
      <button className="arrow" ref={prevRef}>
        <img src={PrevArrowImg} alt="prevarrow" />
      </button>
      <Swiper
        slidesPerView={4}
        spaceBetween={15}
        centeredSlides={true}
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current, // 이전 버튼
          nextEl: nextRef.current, // 다음 버튼
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
      </Swiper>
      <button className="arrow" ref={nextRef}>
        <img src={NextArrowImg} alt="nextarrow" />
      </button>
    </div>
  );
}
