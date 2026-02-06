import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useAuth } from "./auth/AuthContext";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoginSuccess from "./pages/LoginSuccess";

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  if (isLoading) return <div>Loading auth...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Week 1 – MindX App</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-success" element={<LoginSuccess />} />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
