import * as React from "react";
import styles from "src/App.module.less";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "src/pages/login/Login";
import Header from "src/components/header/Header";
import Navbar from "src/components/navbar/Navbar";
import ClaimsPage from "src/pages/claims/ClaimsPage";
import MainPage from "src/pages/main/MainPage";
import NewsPage from "src/pages/news/NewsPage";
import TermsOfUse from "src/pages/legal/TermsOfUse";
import PrivacyPolicy from "src/pages/legal/PrivacyPolicy";
import { PrivateOutlet } from "src/utils/PrivateOutlet";
import MissionPage from "src/pages/mission/MissionPage";
import WishesPage from "./pages/wishes/WishesPage";
import { DocumentsPage } from "./pages/documents/DocumentsPage";

const App = () => (
  <BrowserRouter>
    <Header />
    <Navbar />
    <div className={`${styles.wrapper} ${styles["base-colors"]}`}>
      <div className={`${styles.container}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateOutlet />}>
            <Route index element={<MainPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/claims" element={<ClaimsPage />} />
            <Route path="/wishes" element={<WishesPage />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/our-missions" element={<MissionPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
