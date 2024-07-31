import { Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./pages/Mainpage";
import Create from "./pages/Create";
import List from "./pages/project/List";
import Detail from "./pages/project/Detail";
import Mypage from "./pages/Mypage";
import MypageEdit from "./pages/MypageEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/create" element={<Create />} />
        <Route path="/list" element={<List />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/edit" element={<MypageEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
