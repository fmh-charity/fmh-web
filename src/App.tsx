import * as React from "react";
import styles from "src/App.module.less";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
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
import ViewClaims from "src/pages/claims/components/viewClaimCard/ViewClaims";
import EditNews from "src/pages/news/components/editNews/EditNews";
import WishesPage from "./pages/wishes/WishesPage";
import ViewWishes from "./pages/wishes/components/viewWishesCard/ViewWishes";

const App = () => (
  <BrowserRouter>
    <div className={`${styles.wrapper} ${styles["base-colors"]}`}>
      <Navbar />
      <div className={`${styles.container}`}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="/main-page" element={<MainPage />} />
            <Route path="/news" element={<Outlet />}>
              <Route index element={<NewsPage />} />
              <Route path="add" element={<AddNews />} />
              <Route path="edit/:id" element={<EditNews />} />
            </Route>
            <Route path="/claims" element={<Outlet />}>
              <Route index element={<ClaimsPage />} />
              <Route path="view/:id" element={<ViewClaims />} />
            </Route>
            <Route path="/wishes" element={<Outlet />}>
              <Route index element={<WishesPage />} />
              <Route path="view/:id" element={<ViewWishes />} />
            </Route>
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
