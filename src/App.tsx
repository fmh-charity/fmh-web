import * as React from "react";
import styles from "src/App.module.less";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "src/pages/login/Login";
import Header from "src/components/header/Header";
import Navbar from "src/components/navbar/Navbar";
import ClaimsPage from "src/pages/claims/ClaimsPage";
import MainPage from "src/pages/main/MainPage";
import NewsPage from "src/pages/news/NewsPage";
import AddNews from "src/pages/news/components/addNews/AddNews";
import TermsOfUse from "src/pages/legal/TermsOfUse";
import PrivacyPolicy from "src/pages/legal/PrivacyPolicy";
import { PrivateOutlet } from "src/utils/PrivateOutlet";

const App = () => (
  <BrowserRouter>
    <div className={`${styles.wrapper} ${styles["base-colors"]}`}>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/main-page" element={<MainPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/add-news" element={<AddNews />} />
          <Route path="/claims" element={<ClaimsPage />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
