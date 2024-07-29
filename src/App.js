import { Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./pages/Mainpage";
import Create from "./pages/Create";
import List from "./pages/project/List";
import MyPage from "./pages/Mypage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/create" element={<Create />} />
        <Route path="/list" element={<List />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
