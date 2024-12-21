import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Login,
  Error,
  Privacy,
  Terms,
  Register,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
  HomeLayout,
  Home,
  Chat,
  Credits,
  Explore,
  TempChat,
  ShareChat,
} from "./pages";

import { loader as VerifyEmailLoader } from "./pages/VerifyEmail";
import { loader as ResetPasswordLoader } from "./pages/ResetPassword";

import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import Test from "./components/Test";
import { Provider } from "react-redux";
import { store } from "./store";
import ProtectedLayout from "./pages/ProtectedLayout";
import { Toaster } from "react-hot-toast";
import { ErrorSection } from "./components";
import Bots from "./pages/Bots";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedLayout>
        <HomeLayout />
      </ProtectedLayout>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
        errorElement: <ErrorSection />,
      },
      {
        path: "/chat",
        element: <TempChat />,
      },
      {
        path: "/chat/:id",
        element: <Chat />,
        errorElement: <ErrorSection />,
      },
      {
        path: "/credits",
        element: <Credits />,
        errorElement: <ErrorSection />,
      },
      {
        path: "/explore",
        element: <Explore />,
        errorElement: <ErrorSection />,
      },
      {
        path: "/bots",
        element: <Bots />,
        errorElement: <ErrorSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorSection />,
      },
    ],
    //loader: () => redirect("/login"),
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/signup",
    action: registerAction,
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    loader: ResetPasswordLoader,
  },
  {
    path: "/verify-email",
    loader: VerifyEmailLoader,
    element: <VerifyEmail />,
  },
  {
    path: "/share/:id",
    element: <ShareChat />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  );
}

export default App;
