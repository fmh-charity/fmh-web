import * as React from "react";
import styles from "src/App.module.less";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./authorization/Login";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import ClaimsPage from "./pages/claims/ClaimsPage";
import MainPage from "./pages/main/MainPage";
import NewsPage from "./pages/news/NewsPage";
import AddNews from "./pages/news/components/addNews/AddNews";
import TermseOfUse from "./pages/TermseOfUse";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <div className={`${styles.wrapper} ${styles["base-colors"]}`}>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/add-news" element={<AddNews />} />
          <Route path="/claims" element={<ClaimsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms-of-use" element={<TermseOfUse />} />
          <Route path="/privacy-policy" element={<Login />} />
        </Routes>
      </div>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
