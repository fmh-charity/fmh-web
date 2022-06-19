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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [hidden, setHidden] = React.useState(true);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className={`${styles.wrapper} ${styles["base-colors"]}`}>
          <Header toggleMenu={() => setHidden(!hidden)} />
          {hidden && <Navbar toggleMenu={() => setHidden(!hidden)} />}
          <div className={styles.grid}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/claims" element={<ClaimsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/terms-of-use" element={<Login />} />
              <Route path="/privacy-policy" element={<Login />} />
            </Routes>
          </div>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
