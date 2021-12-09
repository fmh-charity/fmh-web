import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./utils/routes";

const NotFound = React.lazy(() => import("./pages/404/NotFound.js"));

const AppRouter = () => {
  return (
    <Suspense fallback="Loading">
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
