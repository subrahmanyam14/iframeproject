import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css';  // You can rename it to Register.css if you separate styles
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  useEffect(() => {
    if(token)
    {
      handleFetchData();
    }
    else{
      toast.error("Please Login....", {position: "top-center"});
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [])
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNo: ""
  })
  const handleFetchData = async () => {
    

    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json"
          }
        }
      );
      let extract = res.data;
      console.log({extract});
      setIsLoading(false);
      setData({...data, ...extract});
      
    } catch (error) {
      toast.error('Failed to fetch profile...!', {position: "top-center"});
    }
  };

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  return (
    isLoading?<div><center>Loading....</center><ToastContainer /></div>:
    <div className='form-main'>
      <div className="form-main-container">
        <ToastContainer />
        <div className="form-row justify-content-center">
          <div className="form-card">
            <div className="form-card-body">
              <div className="form-text-center">
                <h1>Your Profile</h1>
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={data.name}
                  disabled
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={data.email}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNo">Phone Number:</label>
                <input
                  type="text"
                  id="phoneNo"
                  className="form-control"
                  value={data.phoneNo}
                  disabled
                  onChange={handleChange}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div> */}
              <button onClick={() => {navigate("/")}} className="form-btn">Close</button>
              <div className="form-links">
                {/* <Link to="/login" className="form-link">Login</Link>
                {' | '}
                <Link to="/forgot-password" className="form-link">Forgot Password</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
};

export default UserProfile;
