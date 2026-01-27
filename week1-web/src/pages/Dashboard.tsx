import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { apiFetch } from '../api/client';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const testApi = async () => {
    try {
      const res = await apiFetch('/protected');
      console.log('API status:', res.status);
    } catch (err) {
      console.error('API error:', err);
    }
  };

  return (
    <>
      <h2>Protected Dashboard</h2>

      <button onClick={testApi}>
        Test API
      </button>

      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
