import { useState, useEffect } from 'react'
import axios from 'axios'
import { ModeSwitch } from './requests/requests'
import './App.css'
import App1 from './logI/app1'
import App2 from './logO/app2'

//adb reverse tcp:5173 tcp:5173

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  const [user, setUser] = useState({
    userId: '',
    username: '',
    email: '',
    passwordHash: '',
    createdAt: '',
    mode: 'light'
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user', { withCredentials: true })
        console.log(response.status)
        console.log(response.data)
        setUser(response.data)
        setLoggedIn(response.status === 200)
      } catch (err) {
        err
        setLoggedIn(false)
      }
    }
    checkAuth()
  }, [])

  function modeSwitchOptimistic() {
    const a = { mode: 'light' }
    const b = { mode: 'dark' }
    user.mode == 'light' ? setUser(b) : setUser(a)
    try {
      ModeSwitch()
    } catch (error) {
      console.log(error)
      user.mode == 'light' ? setUser(user.mode = 'light') : setUser(user.mode = 'dark')
    }
  }

  return (
    <>
      <div className={user.mode}>
        {loggedIn ? <App1 userName={user.username} mode={user.mode} modeSwitchOptimistic={modeSwitchOptimistic} /> : <App2 />}
      </div>
    </>
  )
}

export default App

