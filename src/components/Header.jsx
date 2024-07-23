import LogoImg from "../imgs/logo.svg";
import SearchImg from "../imgs/search.svg";
import ProfileImg from "../imgs/myprofile.svg";
import "../styles/header.css";

export default function Header() {
  return (
    <div className="headerContainer">
      <div>
        <img src={LogoImg} alt="logo" />
      </div>
      <div className="searchContainer">
        <input className="searchBox" placeholder="책 제목, 작가명" />
        <img src={SearchImg} alt="search" />
      </div>
      <div className="headerRight">
        <button id="goWrite">책 발간하기</button>
        <div>
          <img className="profile" src={ProfileImg} alt="profile" />
        </div>
      </div>
    </div>
  );
}
