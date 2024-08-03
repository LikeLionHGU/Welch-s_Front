import { useState, useEffect } from "react";
import ImgNone from "../imgs/img_none.svg";
import "../styles/ImgUpLoad.css";

export default function ImgUpLoad({ onImageUpload }) {
  const [imageSrc, setImageSrc] = useState(`${ImgNone}`);

  // useEffect(() => {
  //   if (initialImage) {
  //     setImageSrc(initialImage);
  //   }
  // }, [initialImage]);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve(reader.result); // Base64 인코딩된 파일 반환
      };
    });
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <main className="img-container">
      <div className="img-preview">
        {imageSrc && (
          <img
            className="img-image"
            onClick={handleClick}
            src={imageSrc}
            alt="preview-img"
          />
        )}
      </div>

      <input
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          encodeFileToBase64(file).then(() => {
            onImageUpload(file); // 파일을 부모 컴포넌트로 전달
          });
        }}
      />
    </main>
  );
}
