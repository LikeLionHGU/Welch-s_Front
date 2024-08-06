import React, { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";
//import { Navigation, Pagination } from 'swiper';
import Notification from "../components/Notification";
import NextArrowImg from "../imgs/nextArrow.svg";
import PrevArrowImg from "../imgs/prevArrow.svg";
import { useNavigate } from "react-router-dom";

import '../styles/peopleslide.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// const PeopleSlideContent = ({ mode, data, selected}) => {
//     console.log(mode);
//     console.log(data);

//     const renderContent = () => {
//         switch (mode) {
//             case 0: //작가 네임, 프로필만 
//                 return (
//                     <div className='slide-setting-people-container'>
//                         <div className='setting-people-profile'>
//                             <div>
//                                 <img
//                                     className="setting-people-img"
//                                     src={data.imageAddress}
//                                 />
//                             </div>
//                             <div className="setting-people-name">{data.name}</div>
//                         </div>
//                     </div>
//                 );
//             case 1: //내보내기, 권한 위임
//                 return (
//                     <div className='slide-setting-people-container'>
//                         <div className='setting-people-profile'>
//                             <div>
//                                 <img
//                                     className="setting-people-img"
//                                     src={data.imageAddress}
//                                 />
//                             </div>
//                             <div className="setting-people-name">{data.name}</div>
//                         </div>
//                         <div className='slide-setting-manange'>
//                             <button
//                                 onClick={Notification}
//                                 className="exporting-button"
//                             >
//                                 내보내기
//                             </button>
//                             <button
//                                 className="permissions-button"
//                             >
//                                 권한 위임
//                             </button>
//                         </div>
//                     </div>
//                 );
//             case 2: //권한 위임하기 
//                 return (
//                     <div className='slide-setting-people-container'>
//                         <div className='setting-people-profile-2'>
//                             <div>
//                                 <img
//                                     className="setting-people-img"
//                                     src={data.imageAddress}
//                                 />
//                             </div>
//                             <div className="setting-people-name">{data.name}</div>
//                         </div>
//                         <div className='slide-setting-manange'>
//                             <button
//                                 className={`permissions-button ${selected ? "active" : ""}`}
//                             >
//                                 권한 위임
//                             </button>
//                         </div>
//                     </div>
//                 );
//             case 3: //권한 취소하기
//                 return (
//                     <div className='slide-setting-people-container'>
//                         <div className='setting-people-profile-2'>
//                             <div>
//                                 <img
//                                     className="setting-people-img"
//                                     src={data.imageAddress}
//                                 />
//                             </div>
//                             <div className="setting-people-name">{data.name}</div>
//                         </div>
//                         <div className='slide-setting-manange'>
//                             <button
//                                 className="permissions-delete-button"
//                             >
//                                 권한 위임 취소
//                             </button>
//                         </div>
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     }

//     return renderContent();
// }



export default function PeopleSlide({ mode, data, projectId }) {
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

    const toApprove = async (userId) => {
        console.log(projectId);
        const token = localStorage.getItem("token");
        
        const value = {
          userId: userId,
          projectId: projectId
        };
    
        try {
          const response = await axios.post(
            `https://likelion.info/project/application/approve`,
            value,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
    
          if (response.status === 200) {
            console.log("Post uploaded successfully");
            alert("게시물 업로드 성공");
            
          } else {
            console.error("Error uploading post");
          }
        } catch (error) {
          if (error.response) {
            console.error("Error response from server:", error.response);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error in setting up request:", error.message);
          }
          console.error("Error uploading post:", error);
          alert(`Error uploading post: ${error.message}`);
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        }
    }

    const toDelete = async (userId) => {
        console.log(projectId);
        const token = localStorage.getItem("token");
        
        
    
        try {
          const response = await axios.delete(
            `https://likelion.info/project/application/delete/${userId}/${projectId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
    
          if (response.status === 200) {
            console.log("Post uploaded successfully");
            alert("게시물 업로드 성공");
            
          } else {
            console.error("Error uploading post");
          }
        } catch (error) {
          if (error.response) {
            console.error("Error response from server:", error.response);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error in setting up request:", error.message);
          }
          console.error("Error uploading post:", error);
          alert(`Error uploading post: ${error.message}`);
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        }
    }

    const toDeleteProjectUser = async (userId) => {
        console.log(projectId);
        const token = localStorage.getItem("token");
        
        
    
        try {
          const response = await axios.delete(
            `https://likelion.info/project/user/delete/${userId}/${projectId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
    
          if (response.status === 200) {
            console.log("Post uploaded successfully");
            alert("게시물 업로드 성공");
            
          } else {
            console.error("Error uploading post");
          }
        } catch (error) {
          if (error.response) {
            console.error("Error response from server:", error.response);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error in setting up request:", error.message);
          }
          console.error("Error uploading post:", error);
          alert(`Error uploading post: ${error.message}`);
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        }
    }

    const toUpdate = async (userId) => {
        console.log(projectId);
        const token = localStorage.getItem("token");
    
        try {
          const response = await axios.patch(
            `https://likelion.info/project/update/owner/${userId}/${projectId}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
    
          if (response.status === 200) {
            console.log("Post uploaded successfully");
            alert("게시물 업로드 성공");
            
          } else {
            console.error("Error uploading post");
          }
        } catch (error) {
          if (error.response) {
            console.error("Error response from server:", error.response);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error in setting up request:", error.message);
          }
          console.error("Error uploading post:", error);
          alert(`Error uploading post: ${error.message}`);
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        }
    }


    
    
    
    
    const PeopleSlideContent = ({ mode, data }) => {
        
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
                        <button onClick={() => toDeleteProjectUser(data.id)}
                          className="slide-setting-btn"
                          >
                            내보내기
                        </button>
                        <button onClick={() => toUpdate(data.id)}
                          className="slide-setting-btn"
                          >
                            권한 위임
                        </button>
                    </div>
    
                ) : mode === 0 ? (
                    <></>
                ) : (<div className='slide-setting-manange'>
                    <button onClick={() => toDelete(data.id)}
                      className="slide-setting-btn"
                      >
                        거절
                    </button>
                    <button onClick={() => toApprove(data.id)}
                      className="slide-setting-btn"
                      >
                        수락
                    </button>
                </div>)}
    
            </div>
        )
    }
    console.log(data);




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
                {(Array.isArray(data) ? data : []).map((item, index) => (
                    <SwiperSlide key={index}>
                        <PeopleSlideContent data={item} mode={mode} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    )

}

