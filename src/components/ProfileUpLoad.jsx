import React, { useState, useRef } from "react";
import ImgNone from "../imgs/img_none.svg";
import "../styles/profileUpLoad.scss"


export default function ProfileUpload({ onProFileUpload }) {
    const [profile, setProfile] = useState(ImgNone);
    const proFileInput = useRef(null);

    const proFileChange = e => {
        const file = e.target.files[0];
        if (!file) {
            setProfile(ImgNone);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === FileReader.DONE) {
                setProfile(reader.result);
                onProFileUpload(reader.result); // Base64 인코딩된 파일을 부모 컴포넌트로 전달
            }
        };
        reader.readAsDataURL(file);
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
            </div>

            <input
                className="fileUploader"
                type="file"
                accept="image/*"
                onChange={proFileChange}
                ref={proFileInput}
                name="profile_img"
                style={{ display: "none" }}
            />
        </main>
    );
}
