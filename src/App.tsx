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
import Delivery from "./pages/Delivery/Delivery";
import Returns from "./pages/Returns/Returns";
import Contact from "./pages/Contact/Contact";
import Privacy from "./pages/Privacy/Privacy";
import Mission from "./pages/Mission/Mission";
import Sustainability from "./pages/Sustainability/Sustainability";
import Press from "./pages/Press/Press";
import Careers from "./pages/Careers/Careers";
import News from "./pages/News/News";
import AllSeller from "./pages/AllSeller/AllSeller";
import SellerDetails from "./pages/SellerDetails/SellerDetails";

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
          <Route path="/delivery" element={<Delivery/>} />
          <Route path="/returns" element={<Returns/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path="/mission" element={<Mission/>} />
          <Route path="/sustainability" element={<Sustainability/>} />
          <Route path="/press" element={<Press/>} />
          <Route path="/careers" element={<Careers/>} />
          <Route path="/news" element={<News/>} />
          <Route path="/all-seller" element={<AllSeller/>} />
          <Route path="/seller/:firstName/:id_user" element={<SellerDetails/>} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
