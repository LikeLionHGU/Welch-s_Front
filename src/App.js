import { Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./pages/Mainpage";
import Create from "./pages/Create";
import List from "./pages/project/List";
import Detail from "./pages/project/Detail";
import Mypage from "./pages/Mypage";
import MypageEdit from "./pages/MypageEdit";
import Update from "./pages/project/Update";
import Board from "./pages/Board";
import Setting from "./pages/project/manager/Setting";
import Galpi from "./pages/project/manager/Galpi";
import Approval from "./pages/project/manager/Approval";
import Profile from "./pages/Profile";
import GalpiUpdate from "./pages/project/manager/GalpiUpdate"

import { RecoilRoot } from "recoil";
import BoardDetail from "./pages/BoardDetail";
import Post from "./pages/Post";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<Create />} />
          <Route path="/list" element={<List />} />
          <Route path="/detail/" element={<Detail />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/edit" element={<MypageEdit />} />
          <Route path="/update" element={<Update />} />
          <Route path="/board" element={<Board />} />
          <Route path="/galpi" element={<Galpi />} />
          <Route path="/mypage/manage" element={<Setting />} />
          <Route path="/approval" element={<Approval />} />
          <Route path="/boardDetail/" element={<BoardDetail/>} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/galpi/update" element={<GalpiUpdate />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
