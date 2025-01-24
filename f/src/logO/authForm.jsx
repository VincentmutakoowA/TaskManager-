import { useState, useRef } from "react";
import "./AuthForm.css";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar' //import useRef
import back from '../assets/icons/back.svg'

// eslint-disable-next-line react/prop-types
export default function AuthForm({ setReset, setHero }) {

  const ref = useRef(null)
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
          window.location.reload()
        })
        .catch((err) => {
          if(err.response === undefined) { 
            toastMessage = err.message
            return toast.error(toastMessage, { position: 'top-center' })
          }
          if(err.status === 400 ) toastMessage =  err.response.data.message
          toast.error(toastMessage, { position: 'top-center' })
          console.log(err)
        })
        .finally(() => { ref.current.complete() })
    } else {
      axios.post('http://localhost:8000/register', formData)
        .then((response) => { toastMessage = response.data.message })
        .then(() => {
          if (toastMessage == 'Username in use, please try another') {
            toast.warning(toastMessage, { position: 'top-center' })
          } else { toast.success(toastMessage, { position: 'top-center' }) }
        }
        )
        .catch((err) => {
          if(err.response === undefined) { 
            toastMessage = err.message
            return toast.error(toastMessage, { position: 'top-center' })
          }
          toastMessage = (err.response.data.message)
          toast.error(toastMessage, { position: 'top-center' })
        })
        .finally(() => { ref.current.complete() })
    }
  };

  //////////////// BACK TO HOME AND REFRESH


  return (
    <div className="main-container1">
      <LoadingBar ref={ref} color="#4ed9ff" />

      <ToastContainer />
      <div className="backDiv" onClick={setHero}><img src={back}></img></div>
      <div className="auth-container1">
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
                  autoComplete="on"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                autoComplete="on"
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
                autoComplete="on"
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
          <button className="btnNone" onClick={setReset}><small>Forgot Password?</small></button>
        </div>
      </div>
    </div>
  );
};

