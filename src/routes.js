import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

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

const routes = [
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
  {
    path: "homepage",
    element: <HomePage />,
  },
  {
    path: "homepage/profile",
    element: <ProfilePage />,
  },
  {
    path: "homepage/myposts",
    element: <MyPostsPage />,
  },
  {
    path: "homepage/settings",
    element: <SettingsPage />,
  },
];

export default routes;
