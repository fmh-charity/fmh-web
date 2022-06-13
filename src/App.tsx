import * as React from "react";
import styles from "src/App.module.less";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CheckAuth from "./utils/CheckAuth";
import Login from "./authorization/Login";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/navbar";
import MainPage from "./pages/mainPage/MainPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [hidden, setHidden] = React.useState(false);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div
          className={
            hidden
              ? `${styles.wrapper} ${styles["base-colors"]}`
              : `${styles.menuActive} ${styles["base-colors"]}`
          }
        >
          <Header menuHidden={hidden} />
          <Navbar menuHidden={hidden} toggleMenu={() => setHidden(!hidden)} />
          <Routes>
            <Route
              path="/"
              element={
                <CheckAuth>
                  <MainPage />
                </CheckAuth>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
