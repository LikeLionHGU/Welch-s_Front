import React, { useState, useRef } from "react";
import ImgNone from "../imgs/img_none.svg";
import "../styles/WallPaperUpLoad.scss"


export default function WallPaperUpload({ onWallPaperUpload }) {
    const [wallPaper, setWallPaper] = useState(ImgNone);
    const wallPaperFileInput = useRef(null);

    const wallPaperChange = e => {
        const file = e.target.files[0];
        if (!file) {
            setWallPaper(ImgNone);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === FileReader.DONE) {
                setWallPaper(reader.result);
                onWallPaperUpload(reader.result); // Base64 인코딩된 파일을 부모 컴포넌트로 전달
            }
        };
        reader.readAsDataURL(file);
    };

    return(
        <main className="wall-paper-container">
            <div className="wall-paper-preview">
                <img
                    className="wall-paper-edit"
                    src={wallPaper}
                    alt="이미지 수정"
                    onClick={() => wallPaperFileInput.current.click()}
                />
            </div>

            <input
                className="fileUploader"
                type="file"
                accept="image/*"
                onChange={wallPaperChange}
                ref={wallPaperFileInput}
                name="profile_img"
                style={{ display: "none" }}
            />
        </main>
    );
}
