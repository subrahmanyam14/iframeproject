import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Ensure this file exists and contains necessary styles
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      if (res.data.isAdmin) {
        localStorage.setItem('isAdmin', res.data.isAdmin);
      }
      toast.success('Login successful!', {position: "top-center"});
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to login';
      toast.error(errorMessage, {position: "top-center"});
    }
  };

  return (
    <div className='form-main'>
      <div className="form-main-container">
        <ToastContainer />
        <div className="form-row justify-content-center">
          <div className="form-card">
            <div className="form-card-body">
              <div className="form-text-center">
                <h1>Login</h1>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={handleLogin} className="form-btn">Login</button>
              <div className="form-links">
                <Link to="/register" className="form-link">Register</Link>
                {' | '}
                <Link to="/forgot-password" className="form-link">Forgot Password</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
