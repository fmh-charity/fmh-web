import "./index.less";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "./Components/App";
import { RootRoute, loader as loaderRoot } from "./routes/root";
import { LoginRoute, action as loginAction, loader as loaderLogin } from "./routes/login";
import { loader as loaderLogout } from "./routes/logout";
import { NewsRoute, loader as loaderNews } from "./routes/news";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    errorElement: <div>ups error</div>,
    element: <App />,
    children: [
      {
        path: "/",
        loader: loaderRoot(queryClient),
        element: <RootRoute />,
        children: [
          { element: <div>index</div>, index: true },
          { path: "news", loader: loaderNews(queryClient), element: <NewsRoute /> },
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
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
