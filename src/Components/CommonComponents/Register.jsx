import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';  // Renamed the CSS file to Register.css
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  
  
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      if (!name || !email || !password || !phoneNo) {
        toast.error('Please provide all fields...');
      }
      else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, { name, email, password, phoneNo });
        toast.success('Registration successful!');
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error('Failed to register');
    }
  };

  return (
    <div className='registration-form-main'>
      
      <div className="registration-main-container">
        <ToastContainer />
        <div className="registration-row justify-content-center">
          <div className="registration-card">
            <div className="registration-card-body">
              <div className="registration-text-center">
                <h1>Register</h1>
              </div>
              <div className="registration-form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  className="registration-form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="registration-form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="registration-form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="registration-form-group">
                <label htmlFor="phoneNo">Phone Number:</label>
                <input
                  type="text"
                  id="phoneNo"
                  className="registration-form-control"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="registration-form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="registration-form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="registration-form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="registration-form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button onClick={handleRegister} className="registration-btn-submit">Register</button>
              <div className="registration-links">
                <Link to="/login" className="registration-link">Login</Link>
                {' | '}
                <Link to="/forgot-password" className="registration-link">Forgot Password</Link>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
