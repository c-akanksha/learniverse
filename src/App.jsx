import React, { useEffect, useState, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useHealth } from "./utils/queries";

import Loader from "./components/Loader";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Course from "./pages/Course";
import Progress from "./pages/Progress";
import Courses from "./pages/Courses";

const getLearnerId = () => localStorage.getItem("learnerId");

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const { isLoading } = useHealth();

  const [learnerId, setLearnerId] = useState(getLearnerId);

  useEffect(() => {
    const syncAuth = () => {
      setLearnerId(getLearnerId());
    };

    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth-change", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-change", syncAuth);
    };
  }, []);

  const redirectPath = useMemo(
    () => (learnerId ? `/courses/${learnerId}` : "/"),
    [learnerId]
  );

  if (isLoading) {
    return (
      <Layout>
        <Loader
          title="Booting Learniverse ✨"
          subtitle="Preparing your personalized AI learning experience..."
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            learnerId ? (
              <Navigate to={redirectPath} replace />
            ) : (
              <Home />
            )
          }
        />

        <Route
          path="/courses/:learnerId"
          element={
            <ProtectedRoute isAuthenticated={Boolean(learnerId)}>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course/:learnerId/:courseId"
          element={
            <ProtectedRoute isAuthenticated={Boolean(learnerId)}>
              <Course />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress/:learnerId/:courseId"
          element={
            <ProtectedRoute isAuthenticated={Boolean(learnerId)}>
              <Progress />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={redirectPath} replace />}
        />
      </Routes>
    </Layout>
  );
};

export default App;