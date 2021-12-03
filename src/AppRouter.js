import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MAIN, NEWS } from "./utils/constants";

const Main = React.lazy(() => import("./pages/Main/Main.js"));
const News = React.lazy(() => import("./pages/News/News.js"));

const AppRouter = () => {
  return (
    <Suspense fallback="Loading">
      <Routes>
        <Route path={MAIN} element={<Main />} />
        <Route path={MAIN} element={<Main />} />
        <Route path={MAIN} element={<Main />} />
        <Route path={MAIN} element={<Main />} />
        <Route path={MAIN} element={<Main />} />
        <Route path={MAIN} element={<Main />} />
        <Route path={NEWS} element={<News />} />
        <Route path={MAIN} element={<Main />} />
        <Route path={MAIN} element={<Main />} />
        <Route path={MAIN} element={<Main />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
