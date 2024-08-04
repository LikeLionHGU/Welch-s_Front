import React, { useState, useRef, useEffect } from "react";
import ImgNone from "../imgs/img_none.svg";
import ProfileBack from "../imgs/profile_edit_back.svg"
import ProfileEdit from "../imgs/profile_edit.svg";

import "../styles/profileUpLoad.scss"


export default function ProfileUpload({ onProFileUpload, initialImage }) {
    const [profile, setProfile] = useState(ImgNone);
    const proFileInput = useRef(null);

    useEffect(() => {
        if (initialImage) {
          setProfile(initialImage);
        }
      }, [initialImage]);

      const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
    
        reader.readAsDataURL(fileBlob);
    
        return new Promise((resolve) => {
          reader.onload = () => {
            setProfile(reader.result);
            resolve(reader.result); // Base64 인코딩된 파일 반환
          };
        });
      };

    return(
        <main className="profile-container">
            <div className="profile-preview">
                <img
                    className="profile-edit"
                    src={profile}
                    alt="이미지 수정"
                    onClick={() => proFileInput.current.click()}
                />
                <img
                  className="profile-edit-back"
                  src={ProfileBack}
                />
                <img
                  className="profile-edit-img"
                  src={ProfileEdit}
                  onClick={() => proFileInput.current.click()}
                />
            </div>

            <input
                className="fileUploader"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0];
                    encodeFileToBase64(file).then(() => {
                        onProFileUpload(file); // 파일을 부모 컴포넌트로 전달
                    });
                  }}
                ref={proFileInput}
                name="profile_img"
                style={{ display: "none" }}
            />
        </main>
    );
}
