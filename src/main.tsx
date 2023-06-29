import "normalize.css";
import "./styles/fonts.css";
import "./styles/index.less";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App, loader as loaderApp } from "./components/app";
import {
  LoginRoute,
  loader as loaderLogin,
  action as loginAction,
} from "./routes/login";
import { loader as loaderLogout } from "./routes/logout";
import { NewsRoute, loader as loaderNews } from "./routes/news";
import {
  RegistrationRoute,
  action as actionRegistration,
  loader as loaderRegistration,
} from "./routes/registration";
import {
  ResetPassword,
  loader as loaderResetPassword,
} from "./routes/resetPassword";
import { RootRoute, loader as loaderRoot } from "./routes/root";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    errorElement: <div>ups error</div>,
    element: <App />,
    loader: loaderApp(queryClient),
    children: [
      {
        path: "/",
        loader: loaderRoot(queryClient),
        element: <RootRoute />,
        children: [
          { element: <div>index</div>, index: true },
          {
            path: "news",
            loader: loaderNews(queryClient),
            element: <NewsRoute />,
          },
          {
            path: "*",
            element: <div>*</div>,
          },
        ],
      },
      {
        path: "/login",
        loader: loaderLogin(queryClient),
        action: loginAction(queryClient),
        element: <LoginRoute />,
      },
      {
        path: "/logout",
        loader: loaderLogout(queryClient),
      },
      {
        path: "/registration",
        loader: loaderRegistration(queryClient),
        action: actionRegistration(queryClient),
        element: <RegistrationRoute />,
      },
      {
        path: "/resetPassword",
        loader: loaderResetPassword(queryClient),
        element: <ResetPassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
