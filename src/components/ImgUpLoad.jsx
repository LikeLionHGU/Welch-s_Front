import React, { useState } from "react";
import ImgNone from "../imgs/img_none.svg";
import "../styles/ImgUpLoad.css";

export default function ImgUpLoad() {
  const [imageSrc, setImageSrc] = useState(`${ImgNone}`);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);

        resolve();
      };
    });
  };

  console.log(imageSrc);

  return (
    <main className="img-container">
      <div className="img-preview">
        {imageSrc && (
          <img className="img-image" src={imageSrc} alt="preview-img" />
        )}
      </div>

      <input
        type="file"
        onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
        }}
      />
    </main>
  );
}
