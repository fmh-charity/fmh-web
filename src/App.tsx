import * as React from "react";
import styles from "src/App.module.less";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CheckAuth from "./utils/CheckAuth";
import Login from "./authorization/Login";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/navbar";

const queryClient = new QueryClient();

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
                  <h1>MainPage</h1>
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
