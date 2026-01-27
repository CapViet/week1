import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Home() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login('fake-token');
    navigate('/dashboard');
  };

  return (
    <>
      <h2>Public Home</h2>
      <button onClick={handleLogin}>
        Login (fake)
      </button>
    </>
  );
}
