import React, { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
//import { Navigation, Pagination } from 'swiper';
import NextArrowImg from "../imgs/nextArrow.svg";
import PrevArrowImg from "../imgs/prevArrow.svg";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const PeopleSlideContent = ({ mode, data }) => {
    console.log(mode);
    console.log(data);
    return (
        <div className='slide-setting-people-container'>
            <div className='setting-people-profile'>
                <div>이미지</div>
                <div>{data.name}</div>
            </div>
            {mode === 1 ? (
                <div className='slide-setting-manange'>
                    <button>
                        내보내기
                    </button>
                    <button>
                        권한 위임
                    </button>
                </div>

            ) : (
                <div></div>
            )}

        </div>
    )
}


export default function PeopleSlide({mode, data}) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    //const navigate = useNavigate();



    return (
        <div className="App">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={6}
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
                pagination={{ clickable: true }}
            //scrollbar={{ draggable: true }}
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <PeopleSlideContent data={item} mode={mode} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    )

}
