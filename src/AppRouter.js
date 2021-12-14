import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { NeedAuth } from './shared-kernel/ui/NeedAuth';

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
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
