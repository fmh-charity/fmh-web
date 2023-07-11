import "./index.less";

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
import {
  NurseStationsRoute,
  loader as loaderNurseStations,
} from "./routes/nursestations";
import {
  NurseStationsIndexPage,
  loader as loaderNurseStationsIndex,
} from "./routes/nursestations.index";
import {
  NurseStationsCreatePage,
  action as actionNurseStationsCreateOrUpdate,
} from "./routes/nursestations.create";
import {
  NurseStationsIdPage,
  loader as loaderNurseStationsById,
} from "./routes/nursestations.id";
import { WishesRoute } from "./routes/wishes";
import {
  WishesIndexRoute,
  loader as loaderWishesIndex,
} from "./routes/wishes.index";
import { WishesIdRoute, loader as loaderWishesId } from "./routes/wishes.id";
import {
  WishesCreateRoute,
  loader as loaderWishesCreate,
  action as actionWishesCreate,
} from "./routes/wishes.create";
import { MissionRoute } from "./routes/mission";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    errorElement: <div>ups error</div>,
    element: <App />,
    id: "app",
    loader: loaderApp(queryClient),
    children: [
      {
        path: "*",
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
            path: "wishes",
            element: <WishesRoute />,
            children: [
              {
                index: true,
                loader: loaderWishesIndex(queryClient),
                element: <WishesIndexRoute />,
              },
              {
                path: ":id",
                loader: loaderWishesId(queryClient),
                element: <WishesIdRoute />,
              },
              {
                path: "create",
                loader: loaderWishesCreate(queryClient),
                action: actionWishesCreate(queryClient),
                element: <WishesCreateRoute />,
              },
            ],
          },
          {
            path: "nursestations",
            loader: loaderNurseStations(queryClient),
            element: <NurseStationsRoute />,
            children: [
              {
                element: <NurseStationsIndexPage />,
                loader: loaderNurseStationsIndex(queryClient),
                index: true,
              },
              {
                path: ":id",
                element: <NurseStationsIdPage />,
                loader: loaderNurseStationsById(queryClient),
                action: actionNurseStationsCreateOrUpdate(queryClient),
              },
              {
                path: "create",
                element: <NurseStationsCreatePage />,
                action: actionNurseStationsCreateOrUpdate(queryClient),
              },
            ],
          },
          {
            path:"mission",
            element:<MissionRoute/>
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
