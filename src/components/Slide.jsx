import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import React from "react";
import "../styles/slide.css";

SwiperCore.use([FreeMode, Autoplay]);

export default function Slide() {
  return (
    <Swiper
      style={{ margin: "0", whiteSpace: "pre-wrap" }}
      breakpoints={{
        0: {
          slidesPerView: 3.5,
          spaceBetween: 0,
        },
        900: {
          slidesPerView: 3.5,
          spaceBetween: 0,
        },
      }}
      // freeMode={true} // 자유로운가
      //loop={true} // 무한 루프
      speed={3000} // 슬라이드 이동 속도
      // loopedSlides={1}
      loopAdditionalSlides={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동 이동
      slidesOffsetBefore={65} // 슬라이드 출발 지점에 빈 공간
      slideToClickedSlide={true} // 슬라이드 클릭 시 이동
      className="swiper"
    >
      {ServiceData.map((item, index) => (
        <SwiperSlide key={item.title}>
          <div className="swiperslide">
            <div
              className="swiperslide1"
              id="sliderbg"
              style={{ backgroundImage: `url(${item.backgroundImg})` }}
            ></div>
            <div className="swiperslide2" id="sliderhoverbg"></div>
            <div className="swiperslide3" id="slidertext">
              <div>
                <CardQuestion>{item.question}</CardQuestion>
                <CardTitle>{item.title}</CardTitle>
                <CardContent>{item.content}</CardContent>
              </div>
              <div>
                <TipContainer>
                  <img
                    src={Tip}
                    alt="logo"
                    style={{
                      width: "30px",
                      height: "30px",
                      paddingRight: "15px",
                    }}
                  />
                  <div style={{ fontFamily: "Plaid" }}>TIP</div>
                </TipContainer>
                <CardTip>{item.tip}</CardTip>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
