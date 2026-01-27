import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading auth...</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Week 1 – MindX App</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
