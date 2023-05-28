import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    localStorage.setItem('token', 'mysecrettoken123');
    navigate("/");
  }

  return (
    <>
      <h1>Login</h1>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </>
  );
}
