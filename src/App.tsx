import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Inscription from "./pages/Inscription/Inscription";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";
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
import NotFound from "./pages/NotFound";
import { MessagePanelProvider } from "./context/MessagePanelContext";

const WithNavbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MessagePanelProvider>{children}</MessagePanelProvider>;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WithNavbar><Main /></WithNavbar>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Inscription />} />
          <Route path="/article/:id_article" element={<WithNavbar><ArticleDetails /></WithNavbar>} />
          <Route path="/category/:category_name/:under_category_name" element={<WithNavbar><ArticleByCategorie /></WithNavbar>} />
          <Route path="/profile" element={<WithNavbar><DetailsProfile /></WithNavbar>} />
          <Route path="/all-drip" element={<WithNavbar><AllArticle /></WithNavbar>} />
          <Route path="/faq" element={<WithNavbar><Faq /></WithNavbar>} />
          <Route path="/delivery" element={<WithNavbar><Delivery /></WithNavbar>} />
          <Route path="/returns" element={<WithNavbar><Returns /></WithNavbar>} />
          <Route path="/contact" element={<WithNavbar><Contact /></WithNavbar>} />
          <Route path="/privacy" element={<WithNavbar><Privacy /></WithNavbar>} />
          <Route path="/mission" element={<WithNavbar><Mission /></WithNavbar>} />
          <Route path="/sustainability" element={<WithNavbar><Sustainability /></WithNavbar>} />
          <Route path="/press" element={<WithNavbar><Press /></WithNavbar>} />
          <Route path="/careers" element={<WithNavbar><Careers /></WithNavbar>} />
          <Route path="/news" element={<WithNavbar><News /></WithNavbar>} />
          <Route path="/all-seller" element={<WithNavbar><AllSeller /></WithNavbar>} />
          <Route path="/seller/:firstName/:id_user" element={<WithNavbar><SellerDetails /></WithNavbar>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
