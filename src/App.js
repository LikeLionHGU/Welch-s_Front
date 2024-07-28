import { Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./pages/project/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
