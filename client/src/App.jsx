import { lazy, Suspense, useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import api from "./configs/api";
import { login, logout, setLoading } from "./app/features/authSlice";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";

// Split the heavy authenticated screens out of the initial bundle so the
// landing page does not ship the whole builder to first-time visitors.
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));
const Preview = lazy(() => import("./pages/Preview"));

const App = () => {

  const dispatch = useDispatch();

  const getUserData = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    try {
      const { data } = await api.get("/api/users/data");
      if (data.user) {
        dispatch(login({ token, user: data.user }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      // A stale or invalid token should not leave the app stuck signed in.
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
      console.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    getUserData()
  }, [getUserData])

  return (
    <ErrorBoundary>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          </Route>
          <Route path="view/:resumeId" element={<Preview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
