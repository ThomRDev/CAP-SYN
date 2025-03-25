import { Route, Routes } from "react-router";
import { RegisterFormik } from "./features/auth/components/RegisterForm/RegisterFormik";
import { NotFoundPage } from "./NotFoundPage";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { PublicRouter } from "./router/PublicRouter";
import { PrivateRouter } from "./router/PrivateRouter";
import { LoadingSpinner } from "./LoadingSpinner";
import { sleep } from "./core/utils/sleep";
import { useAuth } from "./features/auth/hooks/useAuth";
import { AUTH_STATUS } from "./store/auth/authSlice";
import LoginForm from "./LoginForm";

// import { HomePage } from "./HomePage";
const HomePage = lazy(async () => {
  await sleep(0);
  return import("./HomePage");
});

export const AppRouter = () => {
  // const [isAuthenticated] = useState(true);

  const { status: authStatus, checkAuthToken } = useAuth();

  useEffect(() => {
    checkAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authStatus === AUTH_STATUS.CHECKING) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRouter>
            <LoginForm />
          </PublicRouter>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRouter>
            <RegisterFormik />
          </PublicRouter>
        }
      />
      <Route
        path="/dashboard-admin"
        element={
          <PrivateRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <HomePage />
            </Suspense>
          </PrivateRouter>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

// { hash | browser
//   [ routes
//     route{},route{},{},{},{},
//   ]
// }
