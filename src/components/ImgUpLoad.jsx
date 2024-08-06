import { useState, useEffect } from "react";
import ImgNone from "../imgs/img_none.svg";
import "../styles/ImgUpLoad.css";

export default function ImgUpLoad({ onImageUpload, initialImage }) {
  const [imageSrc, setImageSrc] = useState(initialImage || `${ImgNone}`);

  useEffect(() => {
    if (initialImage) {
      setImageSrc(initialImage);
    }
  }, [initialImage]);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve(reader.result);
      };
    });
  };

  // const handleClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };
  return (
    <main className="img-container">
      <div className="img-preview" onClick={handleClick}>
        {imageSrc && (
          <img className="img-image" src={imageSrc} alt="preview-img" />
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
