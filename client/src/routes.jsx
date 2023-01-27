import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import AuthGuard from "./common/AuthGuard";
import Loading from "./components/CustomLoading";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

const LoginPage = Loadable(lazy(() => import("./pages/auth/Login")));
const SignupPage = Loadable(lazy(() => import("./pages/auth/Signup")));

const HomePage = Loadable(lazy(() => import("./pages/dashboard/HomePage")));
const ProfilePage = Loadable(lazy(() => import("./pages/dashboard/Profile")));
const MyPostsPage = Loadable(
  lazy(() => import("./pages/dashboard/MyPostsPage"))
);
const SettingsPage = Loadable(lazy(() => import("./pages/dashboard/Settings")));

const PostPage = Loadable(lazy(() => import("./pages/dashboard/PostPage")));
const UserPage = Loadable(lazy(() => import("./pages/dashboard/ProfilePage")));

const Error404Page = Loadable(
  lazy(() => import("./pages/others/Error404Page"))
);

const routes = [
  {
    path: "",
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "post",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      {
        path: ":id",
        element: <PostPage />,
      },
    ],
  },
  {
    path: "homepage",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "myposts",
        element: <MyPostsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "user/:id",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Outlet />,
    children: [
      {
        path: "*",
        element: <Error404Page />,
      },
    ],
  },
];

export default routes;
