// 프로젝트 관리 페이지
import { useState } from "react";
//import ModalContainer from "../../../components/ModalContainer";
import ImgUpLoad from "../components/ImgUpLoad";
import ImgNone from "../imgs/img_none.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const categories = {
  소설: ["공포", "로맨스", "미스터리/추리", "역사", "판타지", "SF"],
  시: ["감정", "사회", "자연", "철학"],
  에세이: ["개인경험", "사회", "여행", "자기개발"],
  비문학: ["과학", "자기개발", "전기", "역사"],
  드라마: ["가족", "모험", "사회", "정치"],
  기타: ["기타"],
}

export default function Setting() {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const openModal = () => setModalIsOpen(true);
  // const closeModal = () => setModalIsOpen(false);
  // return (
  //   <>
  //     <button onClick={openModal}>Open Modal</button>
  //     <ModalContainer isOpen={modalIsOpen} closeModal={closeModal} />
  //   </>
  // );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState({});
  const [visibility, setVisibility] = useState("공개");
  const [people, setPeople] = useState(0);
  const [image, setImage] = useState(`${ImgNone}`);
  const [galpi, setGalpi] = useState([]);
  const [participatiedPeople, setparticipatiedPeople] = useState([]);
  const [appliedPeople, setappliedProple] = useState([]);
  const [progress, setProgress] = useState("진행 중");

  const handleCategoryChange = (category, item) => {
    setSelectedCategories((prevSelectedCategories) => {
      const updatedCategories = {
        ...prevSelectedCategories,
        [category]: item,
      };
      console.log(updatedCategories);
      return updatedCategories;
    })
  };


  

}
