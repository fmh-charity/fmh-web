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
import { PatientsCreateRoute,
  loader as loaderPatientsCreate,
  action as actionPatientsCreateOrUpdate } from "./routes/patients.create";
import {
  PatientsIdRoute,
  loader as loaderPatientById,
} from "./routes/patients.id";
import {
  UsersIndexRoute,
  loader as loaderUsers,
} from "./routes/users";
import { UsersCreateRoute,
  loader as loaderUsersCreate,
  action as actionUsersCreateOrUpdate } from "./routes/users.create";
import { UsersUpdateRoute,
  loader as loaderUsersUpdate, } from "./routes/users.update";
import { MainPageIndexRoute, loader as loaderMainPage } from "./routes/main";
import { VersionRoute } from "./routes/version";
import {
  NewsCreateRoute,
  action as actionNewsCreateOrUpdate,
} from "./routes/news.create";
import { ErrorPage } from "./pages/error-page";
import { PatientsUpdateRoute,
  loader as loaderPatientsUpdate,
 } from "./routes/patients.update";
import { UsersIndex } from "./pages/users-index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <App />,
    id: "app",
    loader: loaderApp(queryClient),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        loader: loaderRoot(queryClient),
        element: <RootRoute />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            loader: loaderMainPage(queryClient),
            element: <MainPageIndexRoute />,
            errorElement: <ErrorPage />,
            index: true,
          },
          {
            path: "main",
            loader: loaderMainPage(queryClient),
            element: <MainPageIndexRoute />,
            errorElement: <ErrorPage />,
            index: true,
          },
          {
            path: "profile",
            action: actionSaveUserInfo(queryClient),
            element: <ProfileRoute />,
            errorElement: <ErrorPage />,
          },
          {
            path: "news",
            element: <Outlet />,
            errorElement: <ErrorPage />,
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
            errorElement: <ErrorPage />,
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
                path: "update/:id",
                action: actionPatientsCreateOrUpdate(queryClient),
                loader: loaderPatientsUpdate(queryClient),
                element: <PatientsUpdateRoute />,
              },
              {
                path: "create",
                action: actionPatientsCreateOrUpdate(queryClient),
                loader: loaderPatientsCreate(queryClient),
                element: <PatientsCreateRoute />,
              },
            ],
          },
          {
            path: "wishes",
            element: <Outlet />,
            errorElement: <ErrorPage />,
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
            errorElement: <ErrorPage />,
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
            path: "users",
            loader: loaderUsers(queryClient),
            element: <Outlet />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                loader: loaderUsers(queryClient),
                element: <UsersIndexRoute />,
              },
              {
                path: "update/:id",
                action: actionUsersCreateOrUpdate(queryClient),
                loader: loaderUsersUpdate(queryClient),
                element: <UsersUpdateRoute />,
              },
              {
                path: "create",
                action: actionUsersCreateOrUpdate(queryClient),
                loader: loaderUsersCreate(queryClient),
                element: <UsersCreateRoute />,
              },
            ],
          },
          {
            path: "mission",
            element: <MissionRoute />,
            errorElement: <ErrorPage />,
          },
          {
            path: "about",
            element: <AboutRoute />,
            errorElement: <ErrorPage />,
          },
          {
            path: "version",
            element: <VersionRoute />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "/login",
        loader: loaderLogin(queryClient),
        action: loginAction(queryClient),
        element: <LoginRoute />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/logout",
        loader: loaderLogout(queryClient),
        errorElement: <ErrorPage />,
      },
      {
        path: "/registration",
        loader: loaderRegistration(queryClient),
        action: actionRegistration(queryClient),
        element: <RegistrationRoute />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/resetPassword",
        loader: loaderResetPassword(queryClient),
        element: <ResetPassword />,
        errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
