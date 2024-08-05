import React, { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
//import { Navigation, Pagination } from 'swiper';
import Notification from "../components/Notification";
import NextArrowImg from "../imgs/nextArrow.svg";
import PrevArrowImg from "../imgs/prevArrow.svg";
import { useNavigate } from "react-router-dom";

import '../styles/peopleslide.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const PeopleSlideContent = ({ mode, data, selected}) => {
    console.log(mode);
    console.log(data);

    const renderContent = () => {
        switch (mode) {
            case 0: //작가 네임, 프로필만 
                return (
                    <div className='slide-setting-people-container'>
                        <div className='setting-people-profile'>
                            <div>
                                <img
                                    className="setting-people-img"
                                    src={data.imageAddress}
                                />
                            </div>
                            <div className="setting-people-name">{data.name}</div>
                        </div>
                    </div>
                );
            case 1: //내보내기, 권한 위임
                return (
                    <div className='slide-setting-people-container'>
                        <div className='setting-people-profile'>
                            <div>
                                <img
                                    className="setting-people-img"
                                    src={data.imageAddress}
                                />
                            </div>
                            <div className="setting-people-name">{data.name}</div>
                        </div>
                        <div className='slide-setting-manange'>
                            <button
                                onClick={Notification}
                                className="exporting-button"
                            >
                                내보내기
                            </button>
                            <button
                                className="permissions-button"
                            >
                                권한 위임
                            </button>
                        </div>
                    </div>
                );
            case 2: //권한 위임하기 
                return (
                    <div className='slide-setting-people-container'>
                        <div className='setting-people-profile-2'>
                            <div>
                                <img
                                    className="setting-people-img"
                                    src={data.imageAddress}
                                />
                            </div>
                            <div className="setting-people-name">{data.name}</div>
                        </div>
                        <div className='slide-setting-manange'>
                            <button
                                className={`permissions-button ${selected ? "active" : ""}`}
                            >
                                권한 위임
                            </button>
                        </div>
                    </div>
                );
            case 3: //권한 취소하기
                return (
                    <div className='slide-setting-people-container'>
                        <div className='setting-people-profile-2'>
                            <div>
                                <img
                                    className="setting-people-img"
                                    src={data.imageAddress}
                                />
                            </div>
                            <div className="setting-people-name">{data.name}</div>
                        </div>
                        <div className='slide-setting-manange'>
                            <button
                                className="permissions-delete-button"
                            >
                                권한 위임 취소
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    return renderContent();
}



export default function PeopleSlide({ mode, data }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const navigate = useNavigate();

    const toProfile = async (id) => {
        const user = localStorage.getItem("id");
    
        if(id === user) {
          navigate("/mypage");
        } else {
          navigate("/profile", { state: { id } });
        }
      };
    
    
    
    const PeopleSlideContent = ({ mode, data }) => {
        console.log(mode);
        console.log(data);
        return (
            <div className='slide-setting-people-container'>
                <div className='setting-people-profile'>
                    <div>
                        <img
                            className="setting-people-img"
                            src={data.imageAddress}
                            onClick={() => toProfile(data.id)}
                        />
                    </div>
                    <div className="setting-people-name">{data.name}</div>
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
                    <div>
    
                    </div>
                )}
    
            </div>
        )
    }




    return (
        <div className="App">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={4.8}
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

