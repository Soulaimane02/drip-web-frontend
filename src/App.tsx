import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Inscription from "./pages/Inscription/Inscription";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";
import { Toaster } from "sonner"; 
import ArticleByCategorie from "./pages/ArticleByCategorie/ArticleByCategorie";
import DetailsProfile from "./pages/DetailsProfile/DetailsProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Inscription />} />
          <Route path="/article/:id_article" element={<ArticleDetails />} />
          <Route path="/category/:category_name/:under_category_name" element={<ArticleByCategorie/>} />
          <Route path="/profile" element={<DetailsProfile/>} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
