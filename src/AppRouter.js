import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { NeedAuth } from './shared-kernel/ui/NeedAuth';
import { Loader } from './page-loader/ui/Loader';

//fix, убрать disable  после того как компоенты будут готовы, сделано чтобы кнопки в сайдбаре были не активными

const AppRouter = () => {
  return (
    <Suspense fallback={Loader}>
      <Routes>
        {routes.map(({ path, Component, disable }) => {
          return <Route 
            key={path} 
            path={path}
            disable={disable}
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
