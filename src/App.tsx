import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styles from "src/App.module.less";
import Navbar from "src/components/navbar/Navbar";
import ClaimsPage from "src/pages/claims/ClaimsPage";
import DocumentsPage from "src/pages/documents";
import PrivacyPolicy from "src/pages/legal/PrivacyPolicy";
import TermsOfUse from "src/pages/legal/TermsOfUse";
import Login from "src/pages/login/Login";
import MainPage from "src/pages/main/MainPage";
import MissionPage from "src/pages/mission/MissionPage";
import NewsPage from "src/pages/news/NewsPage";
import { PrivateOutlet } from "src/utils/PrivateOutlet";
import WishesPage from "./pages/wishes/WishesPage";

const App = () => (
  <BrowserRouter>
    <div className={`${styles.wrapper} ${styles["base-colors"]}`}>
      <Navbar />
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
