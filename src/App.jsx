import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "./utils/ThemeProvider";
import HomePage from "./pages/Home";
import {
  CarsPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
} from "./pages";
import Layout from "./pages/Layout";
import AuthLayout from "./pages/AuthLayout";
import ProtectedPage from "./pages/Protected";
import NonProtectedPage from "./pages/NonProtected";
import store from "./redux/store";
import CarsDetail from "./pages/CarsDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedPage>
        <Layout>
          <HomePage />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/cars",
    element: (
      <ProtectedPage>
        <Layout>
          <CarsPage />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/cars/:id",
    element: (
      <ProtectedPage>
        <Layout>
          <CarsDetail />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/login",
    element: (
      <NonProtectedPage>
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      </NonProtectedPage>
    ),
  },
  {
    path: "/register",
    element: (
      <NonProtectedPage>
        <AuthLayout>
          <RegisterPage />
        </AuthLayout>
      </NonProtectedPage>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedPage>
        <Layout>
          <ProfilePage />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <NotFoundPage />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
