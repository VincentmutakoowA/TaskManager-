/* eslint-disable react/prop-types */
import { useState, useRef } from "react"
import "./authForm.css"
import axios from "axios";
import back from '../assets/icons/back.svg'
import './reset.css'
import LoadingBar from 'react-top-loading-bar'
import { toast, ToastContainer } from 'react-toastify';



//import { ToastContainer } from "react-toastify";

export default function Reset({ setAuthForm }) {

    const ref = useRef(null)

    const [authed, setAuthed] = useState(false)
    const [requestCount, setRequestCount] = useState(0)

    const [formData, setFormData] = useState({ email: "", });
    const [title, setTitle] = useState("Enter your Email")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSubmit() {
        let toastMessage = '';
        if (formData.email == "") return
        ref.current.continuousStart()
        axios.post('http://localhost:8000/reset', { email: formData.email }, { withCredentials: true })
            .then((Response) => {
                setTitle("Enter 5 digit code sent to your email")
                console.log(Response.data)
                setFormData({ email: "" })
                setRequestCount(1)
                requestCount >= 1 ? setAuthed(true) : setAuthed(false)
                toastMessage = 'Check your email for the code.'
                toast.success(toastMessage), { position: 'top-center' }

            })
            .catch((err) => {
                if (err.response === undefined) {
                    toastMessage = err.message
                    return toast.error(toastMessage, { position: 'top-center' })
                }
                console.log(err.message)
                toastMessage = err.response.data.message
                toast.error(toastMessage), { position: 'top-center' }

            })
            .finally(() => { ref.current.complete() })
    }

    function handleSubmitAuth() {
        //CONFIRMATION CODE SENT AS EMAIL
        if (formData.email == "") return
        let toastMessage = '';
        ref.current.continuousStart()
        axios.post('http://localhost:8000/reset/auth', { email: formData.email }, { withCredentials: true })
            .then((Response) => {
                console.log(Response.data)
                setAuthed(true)
                toastMessage = 'Enter your new Password.'
                toast.success(toastMessage), { position: 'top-center' }
            })
            .catch((err) => {
                if (err.response === undefined) {
                    toastMessage = err.message
                    return toast.error(toastMessage, { position: 'top-center' })
                }
                if (err.status === 400) toastMessage = err.response.data.message
                toast.error(toastMessage, { position: 'top-center' })
                console.log(err)
            })
            .finally(() => { ref.current.complete() })
    }

    function handleSubmitPassword() {
        //PASSWORD SENT AS EMAIL
        if (password == "") return
        let toastMessage = '';
        ref.current.continuousStart()
        axios.post('http://localhost:8000/reset/authed', { password }, { withCredentials: true })
            .then((Response) => {
                console.log(Response.data)
                setFormData({ email: "" })
                console.log(requestCount)
                toastMessage = 'Password Changed, Returning to login'
                toast.success(toastMessage), { position: 'top-center' }
                setTimeout(() => {
                    setAuthForm()
                }, 1000);
            })
            .catch((err) => {
                if (err.response === undefined) {
                    toastMessage = err.message
                    return toast.error(toastMessage, { position: 'top-center' })
                }
                if (err.status === 400) toastMessage = err.response.data.message
                toast.error(toastMessage, { position: 'top-center' })
                console.log(err)
            })
            .finally(() => { ref.current.complete() })
    }

    const Form1 = <div className="auth-container1">
        <div className="auth-container2">
            <form className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">{title}</label>
                    <input
                        autoComplete="on"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required={true}
                    />
                </div>
            </form>
            <button onClick={requestCount === 0 ? handleSubmit : handleSubmitAuth} className="primary">SEND</button>
        </div>
    </div>

    const [hidePassword, setHidePassword] = useState(true);
    const [password, setPassword] = useState('');
    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };
    const Form2 = <div className="auth-container1">
        <div className="auth-container2">
            <form className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">Use new password</label>
                    <input
                        autoComplete="new-password"
                        type={hidePassword ? "password" : "text"}
                        id="newPassword"
                        name="newPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="hideBtn" onClick={togglePasswordVisibility}> {hidePassword ? "Show" : "Hide"} </div>
            </form>
            <button onClick={handleSubmitPassword} className="primary">CHANGE</button>
        </div>
    </div>

    return (
        <>
            <div className="main-container1">
                <LoadingBar ref={ref} color="#4ed9ff" />
                <ToastContainer />
                <div className="backDiv" onClick={setAuthForm}><img src={back}></img></div>
                {authed ? Form2 : Form1}
            </div>
        </>
    )
}
