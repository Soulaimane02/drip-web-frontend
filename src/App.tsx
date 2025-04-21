import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Inscription from "./pages/Inscription/Inscription";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";
import { Toaster } from "sonner"; 
import ArticleByCategorie from "./pages/ArticleByCategorie/ArticleByCategorie";
import DetailsProfile from "./pages/DetailsProfile/DetailsProfile";
import AllArticle from "./pages/AllArticle/AllArticle";
import Faq from "./pages/Faq/Faq";

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
          <Route path="/all-drip" element={<AllArticle/>} />
          <Route path="/faq" element={<Faq/>} />


        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
