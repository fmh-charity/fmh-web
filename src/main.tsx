import "./index.less";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { App, loader as loaderApp } from "./pages/app";
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
import {
  WishesIndexRoute,
  loader as loaderWishesIndex,
} from "./routes/wishes.index";
import {
  WishesIdRoute,
  loader as loaderWishesId,
  action as actionWishesCreateOrUpdate,
} from "./routes/wishes.id";
import {
  WishesCreateRoute,
  loader as loaderWishesCreate,
} from "./routes/wishes.create";
import { MissionRoute } from "./routes/mission";
import { ProfileRoute, action as actionSaveUserInfo } from "./routes/profile";
import { AboutRoute } from "./routes/about";
import {
  PatientsIndexRoute,
  loader as loaderPatients,
} from "./routes/patients.index";
import { PatientsCreateRoute } from "./routes/patients.create";
import {
  PatientsIdRoute,
  loader as loaderPatientById,
} from "./routes/patients.id";
import { MainPage } from "./pages/main-page";
import { VersionRoute } from "./routes/version";
import {
  NewsCreateRoute,
  action as actionNewsCreateOrUpdate
} from "./routes/news.create";

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
          { element: <MainPage />, index: true },
          {
            path: "profile",
            action: actionSaveUserInfo(queryClient),
            element: <ProfileRoute />,
          },
          {
            path: "news",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <NewsRoute />,
                loader: loaderNews(queryClient),
              },
              {
                path: "create",
                element: <NewsCreateRoute />,
                action: actionNewsCreateOrUpdate(queryClient),
              },
            ],
          },
          {
            path: "patients",
            element: <Outlet />,
            children: [
              {
                index: true,
                loader: loaderPatients(queryClient),
                element: <PatientsIndexRoute />,
              },
              {
                path: ":id",
                loader: loaderPatientById(queryClient),
                element: <PatientsIdRoute />,
              },
              {
                path: "create",
                element: <PatientsCreateRoute />,
              },
            ],
          },
          {
            path: "wishes",
            element: <Outlet />,
            children: [
              {
                index: true,
                loader: loaderWishesIndex(queryClient),
                element: <WishesIndexRoute />,
              },
              {
                path: ":id",
                loader: loaderWishesId(queryClient),
                action: actionWishesCreateOrUpdate(queryClient),
                element: <WishesIdRoute />,
              },
              {
                path: "create",
                loader: loaderWishesCreate(queryClient),
                action: actionWishesCreateOrUpdate(queryClient),
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
            path: "mission",
            element: <MissionRoute />,
          },
          {
            path: "about",
            element: <AboutRoute />,
          },
          {
            path: "version",
            element: <VersionRoute />,
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
