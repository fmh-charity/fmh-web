import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { NeedAuth } from './components/header/NeedAuth';

const NotFound = React.lazy(() => import("./pages/404/NotFound.js"));

const AppRouter = () => {
  return (
    <Suspense fallback="Loading">
      <Routes>
        {routes.map(({ path, Component }) => {
          return <Route 
            key={path} 
            path={path} 
            element={
              <React.Fragment>
                <NeedAuth />
                {Component ? <Component /> : null}
              </React.Fragment>
            } 
          />;
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
