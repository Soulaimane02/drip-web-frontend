import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Inscription from "./pages/Inscription/Inscription";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Inscription />} />
        <Route path="/article/:id_article" element={<ArticleDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
