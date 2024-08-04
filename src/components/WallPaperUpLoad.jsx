import React, { useState, useRef, useEffect } from "react";
import ImgNone from "../imgs/img_none.svg";

import WallPaperEdit from "../imgs/wallpaper_edit.svg"
import "../styles/WallPaperUpLoad.scss"


export default function WallPaperUpload({ onWallPaperUpload, initialImage }) {
    const [wallPaper, setWallPaper] = useState(initialImage);
    const wallPaperFileInput = useRef(null);

    
    
    useEffect(() => {
        if (initialImage) {

          setWallPaper(initialImage);
        } else {
          setWallPaper(ImgNone);
        }
    }, [initialImage]);

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();

        reader.readAsDataURL(fileBlob);


        return new Promise((resolve) => {
            reader.onload = () => {
                setWallPaper(reader.result);
                resolve(reader.result); // Base64 인코딩된 파일 반환
            };
        });

    };

    if(initialImage === null) {
        return <></>;
    }

    return (
        <main className="wall-paper-container">
            <div className="wall-paper-preview" >
                <img
                    className="wall-paper-edit"
                    src={wallPaper}
                    alt="이미지 수정"
                    onClick={() => wallPaperFileInput.current.click()}
                />
                <img
                    className="wall-paper-edit-image"
                    src={WallPaperEdit}
                    onClick={() => wallPaperFileInput.current.click()}
                />
            </div>

            <input
                className="fileUploader"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0];

                    if(file) {
                        encodeFileToBase64(file).then((base64Image) => {
                            onWallPaperUpload(base64Image); // 파일을 부모 컴포넌트로 전달
                        });
                    }
                    
                  }}
                ref={wallPaperFileInput}
                name="profile_img"
                style={{ display: "none" }}
            />
        </main>
    );
}
