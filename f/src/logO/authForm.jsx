import { useState, useRef } from "react";
import "./AuthForm.css";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router'

const AuthForm = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    ref.current.continuousStart()
    let toastMessage;
    e.preventDefault();
    if (isLogin) {
      axios.post('http://localhost:8000/login', { username: formData.username, password: formData.password }, { withCredentials: true })
        .then((response) => {
          console.log(response); toastMessage = response.data;
          toast.success(toastMessage), { position: 'top-center' }
          return handleRedirectWithRefresh()
        })
        .catch((err) => {
          err.status === 400 ? toastMessage = 'Invalid Details' : toastMessage = err.message
          toast.error(toastMessage, { position: 'top-center' })
        })
        .finally(() => { ref.current.complete() })
    } else {
      axios.post('http://localhost:8000/register', formData)
        .then((response) => { toastMessage = response.data.message })
        .then(() => { toast.success(toastMessage, { position: 'top-center' }) })
        .catch((err) => {
          toastMessage = (err.message)
          toast.error(toastMessage, { position: 'top-center' })
        })
        .finally(() => { ref.current.complete() })
    }
  };

  ////////////////OTHER
  const ref = useRef(null)
  const navigate = useNavigate();

  const handleRedirectWithRefresh = () => {
    navigate('/');
    window.location.reload(); // Forces a refresh after navigating
  };
  

  return (
    <div className="auth-container1">
      <LoadingBar ref={ref} color="#4ed9ff" />

      <ToastContainer />
      <div className="auth-container2">
        <div className="form-toggle">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn" >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
